// TODO: Point the imports to acp-node after publishing

import AcpClient from "../../../src/acpClient";
import AcpContractClient from "../../../src/acpContractClient";
import { baseSepoliaAcpConfig } from "../../../src";
import {
    EVALUATOR_WALLET_ADDRESS,
    WHITELISTED_WALLET_ENTITY_ID,
    WHITELISTED_WALLET_PRIVATE_KEY
} from "./env";

async function evaluator() {
    new AcpClient({
        acpContractClient: await AcpContractClient.build(
            WHITELISTED_WALLET_PRIVATE_KEY,
            WHITELISTED_WALLET_ENTITY_ID,
            EVALUATOR_WALLET_ADDRESS,
            baseSepoliaAcpConfig
        ),
        onEvaluate: async (job) => {
            console.log("Evaluation function called", job);
            await job.evaluate(true, "Externally evaluated and approved");
            console.log(`Job ${job.id} evaluated`);
        },
    });
}

evaluator();
