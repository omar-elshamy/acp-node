import dotenv from "dotenv";
import { Address } from "viem";

dotenv.config({ path: __dirname + '/.env' });

function getEnvVar<T extends string = string>(key: string, required = true): T {
    const value = process.env[key];
    if (required && (value === undefined || value === '')) {
        throw new Error(`${key} is not defined or is empty in the .env file`);
    }
    return value as T;
}

export const WHITELISTED_WALLET_PRIVATE_KEY = getEnvVar<Address>('WHITELISTED_WALLET_PRIVATE_KEY');
export const WHITELISTED_WALLET_ENTITY_ID = parseInt(getEnvVar('WHITELISTED_WALLET_ENTITY_ID'), 10);
export const BUYER_WALLET_ADDRESS = getEnvVar('BUYER_WALLET_ADDRESS') as Address;
export const SELLER_WALLET_ADDRESS = getEnvVar<Address>('SELLER_WALLET_ADDRESS') as Address;
export const EVALUATOR_WALLET_ADDRESS = getEnvVar<Address>('EVALUATOR_WALLET_ADDRESS') as Address;

if (isNaN(WHITELISTED_WALLET_ENTITY_ID)) {
    throw new Error('WHITELISTED_WALLET_ENTITY_ID must be a valid number in the .env file');
}
