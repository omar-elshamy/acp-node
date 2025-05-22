// TODO: Point the imports to acp-node after publishing

import AcpClient, { 
    AcpContractClient, 
    AcpJobPhases, 
    AcpJob, 
    baseSepoliaAcpConfig 
  } from '@virtuals-protocol/acp-node';
import {
    BUYER_AGENT_WALLET_ADDRESS,
    WHITELISTED_WALLET_ENTITY_ID,
    WHITELISTED_WALLET_PRIVATE_KEY
} from "./env";

async function buyer() {
    const acpClient = new AcpClient({
        acpContractClient: await AcpContractClient.build(
            WHITELISTED_WALLET_PRIVATE_KEY,
            WHITELISTED_WALLET_ENTITY_ID,
            BUYER_AGENT_WALLET_ADDRESS,
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
        onEvaluate: async (job: AcpJob) => {
            console.log("Evaluation function called", job);
            await job.evaluate(true, "Self-evaluated and approved");
            console.log(`Job ${job.id} evaluated`);
        },
    });

    const relevantAgents = await acpClient.browseAgents("meme", "999");
    // Pick one of the agents based on your criteria (in this example we just pick the first one)
    const chosenAgent = relevantAgents[0];
    // Pick one of the service offerings based on your criteria (in this example we just pick the first one)
    const chosenJobOffering = chosenAgent.offerings[0]

    const jobId = await chosenJobOffering.initiateJob(
        chosenJobOffering.requirementSchema || {},
        0.01,
        undefined, // Use default evaluator address
        new Date(Date.now() + 1000 * 60 * 60 * 24) // expiredAt as last parameter
    );

    console.log(`Job ${jobId} initiated`);
}

buyer();
