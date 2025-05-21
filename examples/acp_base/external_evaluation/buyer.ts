// TODO: Point the imports to acp-node after publishing

import AcpClient from "../../../src/acpClient";
import AcpContractClient, { AcpJobPhases } from "../../../src/acpContractClient";
import AcpJob from "../../../src/acpJob";
import { baseSepoliaAcpConfig } from "../../../src";
import {
    BUYER_WALLET_ADDRESS,
    EVALUATOR_WALLET_ADDRESS,
    SELLER_WALLET_ADDRESS,
    WHITELISTED_WALLET_ENTITY_ID,
    WHITELISTED_WALLET_PRIVATE_KEY
} from "./env";

async function buyer() {
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
    });

    const relevantAgents = await acpClient.browseAgent("meme", "999");
    console.log("Relevant seller agents: ", relevantAgents);
    // Pick one of the agents based on your criteria (in this example we just pick the second one)
    const chosenAgent = relevantAgents[1];
    // Pick one of the service offerings based on your criteria (in this example we just pick the first one)
    const chosenJobOffering = chosenAgent.offerings[0]

    const jobId = await chosenJobOffering.initiateJob(
        chosenJobOffering.requirementSchema || {},
        EVALUATOR_WALLET_ADDRESS,
        new Date(Date.now() + 1000 * 60 * 60 * 24)
    );
    
    console.log(`Job ${jobId} initiated`);
}

buyer();
