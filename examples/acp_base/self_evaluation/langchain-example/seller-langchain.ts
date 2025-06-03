// TODO: Point the imports to acp-node after publishing

import AcpClient from "../../../src/acpClient";
import AcpContractClient, { AcpJobPhases } from "../../../src/acpContractClient";
import AcpJob from "../../../src/acpJob";
import AcpMessage from "../../../src/acpMessage";
import { baseSepoliaAcpConfig } from "../../../src";
import {
    SELLER_WALLET_ADDRESS,
    WHITELISTED_WALLET_ENTITY_ID,
    WHITELISTED_WALLET_PRIVATE_KEY
} from "./env";
import { ChatOpenAI } from "@langchain/openai";
import { AgentExecutor, createOpenAIFunctionsAgent } from "langchain/agents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { Tool } from "@langchain/core/tools";

// Custom tool for finalizing deals
class FinalizeDealTool extends Tool {
  name = "finalize_deal";
  description = "Finalize a deal when both parties agree on price and terms";

  async _call(input: string): Promise<string> {
    console.log("LangChain Seller: Finalizing deal!");
    return "Deal finalized successfully";
  }
}

async function createSellerAgent() {
  const model = new ChatOpenAI({
    modelName: "gpt-3.5-turbo", 
    temperature: 0.7,
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

  const tools = [new FinalizeDealTool()];

  const prompt = ChatPromptTemplate.fromMessages([
    ["system", `You are a seller offering a meme generator service. 
    
    Try to get the best price while maintaining a good relationship.
    Use the finalize_deal tool when you reach a satisfactory agreement.
    
    Be professional and helpful in your responses.`],
    ["placeholder", "{chat_history}"],
    ["human", "{input}"],
    ["placeholder", "{agent_scratchpad}"],
  ]);

  const agent = await createOpenAIFunctionsAgent({
    llm: model,
    tools,
    prompt,
  });

  return new AgentExecutor({
    agent,
    tools,
    verbose: true,
  });
}

async function seller() {
    // Initialize LangChain agent
    const sellerAgent = await createSellerAgent();

    new AcpClient({
        acpContractClient: await AcpContractClient.build(
            WHITELISTED_WALLET_PRIVATE_KEY,
            WHITELISTED_WALLET_ENTITY_ID,
            SELLER_WALLET_ADDRESS,
            baseSepoliaAcpConfig
        ),
        onNewTask: async (job: AcpJob) => {
            if (
                job.phase === AcpJobPhases.REQUEST &&
                job.memos.find((m) => m.nextPhase === AcpJobPhases.NEGOTIATION)
            ) {
                console.log("Responding to job", job);
                await job.respond(true);
                console.log(`Job ${job.id} responded`);
            } else if (
                job.phase === AcpJobPhases.TRANSACTION &&
                job.memos.find((m) => m.nextPhase === AcpJobPhases.EVALUATION)
            ) {
                console.log("Delivering job", job);
                await job.deliver(
                    JSON.stringify({
                        type: "url",
                        value: "https://example.com",
                    })
                );
                console.log(`Job ${job.id} delivered`);
            }
        },
        onNewMsg: async (msg: AcpMessage, job: AcpJob | null) => {
            const lastMessage = msg.messages[msg.messages.length - 1];
            
            // Only respond if message is from buyer
            if (lastMessage?.sender !== SELLER_WALLET_ADDRESS) {
                console.log(`🗣️ Buyer said: ${lastMessage.content}`);
                
                try {
                    // Use LangChain agent to generate response
                    const result = await sellerAgent.invoke({
                        input: `The buyer said: "${lastMessage.content}". Please respond professionally to continue the negotiation. If this looks like a good deal, use the finalize_deal tool.`,
                        chat_history: [],
                    });
                    
                    const replyContent = result.output || "Let me consider your proposal.";
                    
                    // Send reply through socket
                    msg.initOrReply(replyContent);
                    console.log(`LangChain Seller replied: ${replyContent}`);
                    
                } catch (error) {
                    console.error("LangChain error:", error);
                    // Fallback response
                    msg.initOrReply("Thank you for your offer. Let me think about it.");
                }
            }
        },
    });
}

seller();
