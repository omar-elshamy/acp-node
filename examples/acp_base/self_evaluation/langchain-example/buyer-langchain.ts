// TODO: Point the imports to acp-node after publishing

import AcpClient from "../../../src/acpClient";
import AcpContractClient, {
  AcpJobPhases,
  AcpNegoStatus,
} from "../../../src/acpContractClient";
import AcpJob from "../../../src/acpJob";
import AcpMessage from "../../../src/acpMessage";
import { baseSepoliaAcpConfig } from "../../../src";
import {
    BUYER_WALLET_ADDRESS,
    SELLER_WALLET_ADDRESS,
    WHITELISTED_WALLET_ENTITY_ID,
    WHITELISTED_WALLET_PRIVATE_KEY
} from "./env";
import { ChatOpenAI } from "@langchain/openai";
import { AgentExecutor, createOpenAIFunctionsAgent } from "langchain/agents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { Tool } from "@langchain/core/tools";

// Custom tool for accepting deals
class AcceptDealTool extends Tool {
  name = "accept_deal";
  description = "Accept a negotiated deal when the price and terms are satisfactory";

  async _call(input: string): Promise<string> {
    console.log("LangChain Agent: Accepting deal!");
    return "Deal accepted successfully";
  }
}

// Custom tool for making counter offers
class CounterOfferTool extends Tool {
  name = "counter_offer";
  description = "Make a counter offer with a specific price and terms";

  async _call(input: string): Promise<string> {
    console.log("💰 LangChain Agent: Making counter offer:", input);
    return `Counter offer made: ${input}`;
  }
}

async function createNegotiationAgent() {
  const model = new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
    temperature: 0.7,
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

  const tools = [
    new AcceptDealTool(),
    new CounterOfferTool(),
  ];

  const prompt = ChatPromptTemplate.fromMessages([
    ["system", `You are a buyer negotiating for a meme generator service. 
    
    Use the accept_deal tool when you're satisfied with the price and terms.
    Use the counter_offer tool to propose alternative prices or terms.
    
    Be professional and aim for a win-win negotiation.`],
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

async function buyer() {
    // Initialize LangChain agent
    const negotiationAgent = await createNegotiationAgent();

    const acpClient = new AcpClient({
        acpContractClient: await AcpContractClient.build(
            WHITELISTED_WALLET_PRIVATE_KEY,
            WHITELISTED_WALLET_ENTITY_ID,
            BUYER_WALLET_ADDRESS,
            baseSepoliaAcpConfig
        ),
        onNewTask: async (job: AcpJob) => {
            if (
                job.phase === AcpJobPhases.NEGOTIATION &&
                job.memos.find((m) => m.nextPhase === AcpJobPhases.TRANSACTION)
            ) {
                console.log("Paying job", job);
                await job.pay(1);
                console.log(`Job ${job.id} paid`);
            } else if (job.phase === AcpJobPhases.COMPLETED) {
                console.log(`Job ${job.id} completed`);
            }
        },
        onNewMsg: async (msg: AcpMessage, job: AcpJob) => {
            const lastMessage = msg.messages[msg.messages.length - 1];
            
            // Buyer responds to any message using LangChain
            if (lastMessage?.sender !== BUYER_WALLET_ADDRESS) {
                console.log(`🗣️ Received: ${lastMessage.content}`);
                
                try {
                    // Use LangChain agent to generate response
                    const result = await negotiationAgent.invoke({
                        input: `The seller said: "${lastMessage.content}". Please respond to continue the negotiation. If this is a good deal, use the accept_deal tool. If you want to negotiate further, respond naturally or use the counter_offer tool.`,
                        chat_history: [],
                    });
                    
                    const replyContent = result.output || "I need to think about this offer.";
                    
                    // Send reply through socket
                    msg.initOrReply(replyContent);
                    console.log(`LangChain Buyer replied: ${replyContent}`);
                    
                } catch (error) {
                    console.error("LangChain error:", error);
                    // Fallback response
                    msg.initOrReply("Let me consider your offer.");
                }
            }
        },
        onEvaluate: async (job: AcpJob) => {
            console.log("Evaluation function called", job);
            await job.evaluate(true, "Self-evaluated and approved");
            console.log(`Job ${job.id} evaluated`);
        },
    });

    const relevantAgents = await acpClient.browseAgent("Meme generator");
    console.log("Relevant seller agents: ", relevantAgents);

    const jobId = await acpClient.initiateJob(
        SELLER_WALLET_ADDRESS,
        "Meme generator",
        undefined
    );
    console.log(`Job ${jobId} initiated`);
}

buyer();
