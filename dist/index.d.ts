import { Address as Address$1 } from 'viem';
import { Address } from '@aa-sdk/core';
import { ModularAccountV2Client } from '@account-kit/smart-contracts';
import { baseSepolia, base } from '@account-kit/infra';

declare const ACP_ABI: ({
    inputs: never[];
    stateMutability: string;
    type: string;
    name?: undefined;
    anonymous?: undefined;
    outputs?: undefined;
} | {
    inputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    name: string;
    type: string;
    stateMutability?: undefined;
    anonymous?: undefined;
    outputs?: undefined;
} | {
    anonymous: boolean;
    inputs: {
        indexed: boolean;
        internalType: string;
        name: string;
        type: string;
    }[];
    name: string;
    type: string;
    stateMutability?: undefined;
    outputs?: undefined;
} | {
    inputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    name: string;
    outputs: ({
        components: {
            internalType: string;
            name: string;
            type: string;
        }[];
        internalType: string;
        name: string;
        type: string;
    } | {
        internalType: string;
        name: string;
        type: string;
        components?: undefined;
    })[];
    stateMutability: string;
    type: string;
    anonymous?: undefined;
})[];

type AcpContractConfig = {
    chain: typeof baseSepolia | typeof base;
    contractAddress: Address;
    virtualsTokenAddress: Address;
    acpUrl: string;
    alchemyRpcUrl: string;
};
declare const baseSepoliaAcpConfig: AcpContractConfig;
declare const baseAcpConfig: AcpContractConfig;

declare enum MemoType {
    MESSAGE = 0,
    CONTEXT_URL = 1,
    IMAGE_URL = 2,
    VOICE_URL = 3,
    OBJECT_URL = 4,
    TXHASH = 5
}
declare enum AcpJobPhases {
    REQUEST = 0,
    NEGOTIATION = 1,
    TRANSACTION = 2,
    EVALUATION = 3,
    COMPLETED = 4,
    REJECTED = 5
}
declare class AcpContractClient {
    private walletPrivateKey;
    private sessionEntityKeyId;
    private agentWalletAddress;
    config: AcpContractConfig;
    private _sessionKeyClient;
    private chain;
    private contractAddress;
    private virtualsTokenAddress;
    constructor(walletPrivateKey: Address, sessionEntityKeyId: number, agentWalletAddress: Address, config?: AcpContractConfig);
    static build(walletPrivateKey: Address, sessionEntityKeyId: number, agentWalletAddress: Address, config?: AcpContractConfig): Promise<AcpContractClient>;
    init(): Promise<void>;
    get sessionKeyClient(): ModularAccountV2Client;
    get walletAddress(): Address;
    private getJobId;
    createJob(providerAddress: string, evaluatorAddress: string, expireAt: Date): Promise<{
        txHash: string;
        jobId: number;
    }>;
    approveAllowance(priceInWei: bigint): Promise<SendUserOperationResult<TEntryPointVersion>>;
    createMemo(jobId: number, content: string, type: MemoType, isSecured: boolean, nextPhase: AcpJobPhases): Promise<Address>;
    signMemo(memoId: number, isApproved: boolean, reason?: string): Promise<SendUserOperationResult<TEntryPointVersion>>;
    setBudget(jobId: number, budget: bigint): Promise<SendUserOperationResult<TEntryPointVersion>>;
}

declare class AcpMemo {
    private acpClient;
    id: number;
    type: MemoType;
    content: string;
    nextPhase: AcpJobPhases;
    constructor(acpClient: AcpClient, id: number, type: MemoType, content: string, nextPhase: AcpJobPhases);
    create(jobId: number, isSecured?: boolean): Promise<`0x${string}`>;
    sign(approved: boolean, reason?: string): Promise<SendUserOperationResult<TEntryPointVersion>>;
}

declare class AcpJob {
    private acpClient;
    id: number;
    clientAddress: Address$1;
    providerAddress: Address$1;
    evaluatorAddress: Address$1;
    price: number;
    memos: AcpMemo[];
    phase: AcpJobPhases;
    context: Record<string, any>;
    constructor(acpClient: AcpClient, id: number, clientAddress: Address$1, providerAddress: Address$1, evaluatorAddress: Address$1, price: number, memos: AcpMemo[], phase: AcpJobPhases, context: Record<string, any>);
    get serviceRequirement(): string | undefined;
    get deliverable(): string | undefined;
    get providerAgent(): Promise<AcpAgent | undefined>;
    get clientAgent(): Promise<AcpAgent | undefined>;
    get evaluatorAgent(): Promise<AcpAgent | undefined>;
    pay(amount: number, reason?: string): Promise<`0x${string}`>;
    respond(accept: boolean, reason?: string): Promise<`0x${string}` | undefined>;
    deliver(deliverable: string): Promise<`0x${string}`>;
    evaluate(accept: boolean, reason?: string): Promise<SendUserOperationResult<TEntryPointVersion>>;
}

declare enum AcpAgentSort {
    SUCCESSFUL_JOB_COUNT = "successfulJobCount",
    SUCCESS_RATE = "successRate",
    UNIQUE_BUYER_COUNT = "uniqueBuyerCount",
    MINS_FROM_LAST_ONLINE = "minsFromLastOnlineTime",
    IS_ONLINE = "isOnline"
}
interface IAcpClientOptions {
    acpContractClient: AcpContractClient;
    onNewTask?: (job: AcpJob) => void;
    onEvaluate?: (job: AcpJob) => void;
}
type AcpAgent = {
    id: number;
    documentId: string;
    name: string;
    description: string;
    walletAddress: Address$1;
    isVirtualAgent: boolean;
    profilePic: string;
    category: string;
    tokenAddress: string | null;
    ownerAddress: string;
    cluster: string | null;
    twitterHandle: string;
    offerings: {
        name: string;
        price: number;
        requirementSchema?: Object;
        deliverableSchema?: Object;
    }[];
    symbol: string | null;
    virtualAgentId: string | null;
    metrics?: {
        successfulJobCount: number;
        successRate: number;
        uniqueBuyerCount: number;
        minsFromLastOnline: number;
        isOnline: boolean;
    };
};

declare class AcpJobOffering {
    private readonly acpClient;
    providerAddress: Address$1;
    type: string;
    price: number;
    requirementSchema?: Object | undefined;
    private ajv;
    constructor(acpClient: AcpClient, providerAddress: Address$1, type: string, price: number, requirementSchema?: Object | undefined);
    initiateJob(serviceRequirement: Object | string, evaluatorAddress?: Address$1, expiredAt?: Date): Promise<number>;
}

interface IAcpBrowseAgentsOptions {
    cluster?: string;
    sort_by?: AcpAgentSort[];
    rerank?: boolean;
    top_k?: number;
    graduated?: boolean;
}
declare class AcpClient {
    private acpUrl;
    acpContractClient: AcpContractClient;
    private onNewTask?;
    private onEvaluate?;
    constructor(options: IAcpClientOptions);
    private defaultOnEvaluate;
    init(): Promise<void>;
    browseAgents(keyword: string, options: IAcpBrowseAgentsOptions): Promise<{
        id: number;
        name: string;
        description: string;
        offerings: AcpJobOffering[];
        twitterHandle: string;
        walletAddress: `0x${string}`;
        metrics: {
            successfulJobCount: number;
            successRate: number;
            uniqueBuyerCount: number;
            minsFromLastOnline: number;
            isOnline: boolean;
        } | undefined;
    }[]>;
    initiateJob(providerAddress: Address$1, serviceRequirement: Object | string, amount: number, evaluatorAddress?: Address$1, expiredAt?: Date): Promise<number>;
    respondJob(jobId: number, memoId: number, accept: boolean, reason?: string): Promise<`0x${string}` | undefined>;
    payJob(jobId: number, amount: number, memoId: number, reason?: string): Promise<`0x${string}`>;
    deliverJob(jobId: number, deliverable: string): Promise<`0x${string}`>;
    getActiveJobs(page?: number, pageSize?: number): Promise<AcpJob[]>;
    getCompletedJobs(page?: number, pageSize?: number): Promise<AcpJob[]>;
    getCancelledJobs(page?: number, pageSize?: number): Promise<AcpJob[]>;
    getJobById(jobId: number): Promise<AcpJob | undefined>;
    getMemoById(jobId: number, memoId: number): Promise<AcpMemo | undefined>;
    getAgent(walletAddress: Address$1): Promise<AcpAgent | undefined>;
}

export { ACP_ABI, AcpAgentSort, AcpContractClient, type AcpContractConfig, AcpJob, AcpJobPhases, AcpMemo, MemoType, baseAcpConfig, baseSepoliaAcpConfig, AcpClient as default };
