var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/acpAbi.ts
var ACP_ABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  { inputs: [], name: "AccessControlBadConfirmation", type: "error" },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "bytes32", name: "neededRole", type: "bytes32" }
    ],
    name: "AccessControlUnauthorizedAccount",
    type: "error"
  },
  {
    inputs: [{ internalType: "address", name: "target", type: "address" }],
    name: "AddressEmptyCode",
    type: "error"
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "AddressInsufficientBalance",
    type: "error"
  },
  { inputs: [], name: "FailedInnerCall", type: "error" },
  { inputs: [], name: "InvalidInitialization", type: "error" },
  { inputs: [], name: "NotInitializing", type: "error" },
  { inputs: [], name: "ReentrancyGuardReentrantCall", type: "error" },
  {
    inputs: [{ internalType: "address", name: "token", type: "address" }],
    name: "SafeERC20FailedOperation",
    type: "error"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "jobId",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newBudget",
        type: "uint256"
      }
    ],
    name: "BudgetSet",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "jobId",
        type: "uint256"
      },
      {
        indexed: true,
        internalType: "address",
        name: "evaluator",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "evaluatorFee",
        type: "uint256"
      }
    ],
    name: "ClaimedEvaluatorFee",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "jobId",
        type: "uint256"
      },
      {
        indexed: true,
        internalType: "address",
        name: "provider",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "providerFee",
        type: "uint256"
      }
    ],
    name: "ClaimedProviderFee",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint64",
        name: "version",
        type: "uint64"
      }
    ],
    name: "Initialized",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "jobId",
        type: "uint256"
      },
      {
        indexed: true,
        internalType: "address",
        name: "client",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "provider",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "evaluator",
        type: "address"
      }
    ],
    name: "JobCreated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "jobId",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "oldPhase",
        type: "uint8"
      },
      { indexed: false, internalType: "uint8", name: "phase", type: "uint8" }
    ],
    name: "JobPhaseUpdated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "memoId",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isApproved",
        type: "bool"
      },
      {
        indexed: false,
        internalType: "string",
        name: "reason",
        type: "string"
      }
    ],
    name: "MemoSigned",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "jobId",
        type: "uint256"
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "memoId",
        type: "uint256"
      }
    ],
    name: "NewMemo",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "jobId",
        type: "uint256"
      },
      {
        indexed: true,
        internalType: "address",
        name: "client",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "RefundedBudget",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "bytes32", name: "role", type: "bytes32" },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32"
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32"
      }
    ],
    name: "RoleAdminChanged",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "bytes32", name: "role", type: "bytes32" },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address"
      }
    ],
    name: "RoleGranted",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "bytes32", name: "role", type: "bytes32" },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address"
      }
    ],
    name: "RoleRevoked",
    type: "event"
  },
  {
    inputs: [],
    name: "ADMIN_ROLE",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "PHASE_COMPLETED",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "PHASE_EVALUATION",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "PHASE_NEGOTIATION",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "PHASE_REJECTED",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "PHASE_REQUEST",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "PHASE_TRANSACTION",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "TOTAL_PHASES",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "uint256", name: "jobId", type: "uint256" }
    ],
    name: "canSign",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "id", type: "uint256" }],
    name: "claimBudget",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "provider", type: "address" },
      { internalType: "address", name: "evaluator", type: "address" },
      { internalType: "uint256", name: "expiredAt", type: "uint256" }
    ],
    name: "createJob",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "jobId", type: "uint256" },
      { internalType: "string", name: "content", type: "string" },
      {
        internalType: "enum InteractionLedger.MemoType",
        name: "memoType",
        type: "uint8"
      },
      { internalType: "bool", name: "isSecured", type: "bool" },
      { internalType: "uint8", name: "nextPhase", type: "uint8" }
    ],
    name: "createMemo",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "evaluatorFeeBP",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "jobId", type: "uint256" },
      { internalType: "uint256", name: "offset", type: "uint256" },
      { internalType: "uint256", name: "limit", type: "uint256" }
    ],
    name: "getAllMemos",
    outputs: [
      {
        components: [
          { internalType: "string", name: "content", type: "string" },
          {
            internalType: "enum InteractionLedger.MemoType",
            name: "memoType",
            type: "uint8"
          },
          { internalType: "bool", name: "isSecured", type: "bool" },
          { internalType: "uint8", name: "nextPhase", type: "uint8" },
          { internalType: "uint256", name: "jobId", type: "uint256" },
          { internalType: "address", name: "sender", type: "address" }
        ],
        internalType: "struct InteractionLedger.Memo[]",
        name: "",
        type: "tuple[]"
      },
      { internalType: "uint256", name: "total", type: "uint256" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "jobId", type: "uint256" },
      { internalType: "uint8", name: "phase", type: "uint8" },
      { internalType: "uint256", name: "offset", type: "uint256" },
      { internalType: "uint256", name: "limit", type: "uint256" }
    ],
    name: "getMemosForPhase",
    outputs: [
      {
        components: [
          { internalType: "string", name: "content", type: "string" },
          {
            internalType: "enum InteractionLedger.MemoType",
            name: "memoType",
            type: "uint8"
          },
          { internalType: "bool", name: "isSecured", type: "bool" },
          { internalType: "uint8", name: "nextPhase", type: "uint8" },
          { internalType: "uint256", name: "jobId", type: "uint256" },
          { internalType: "address", name: "sender", type: "address" }
        ],
        internalType: "struct InteractionLedger.Memo[]",
        name: "",
        type: "tuple[]"
      },
      { internalType: "uint256", name: "total", type: "uint256" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getPhases",
    outputs: [{ internalType: "string[6]", name: "", type: "string[6]" }],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [{ internalType: "bytes32", name: "role", type: "bytes32" }],
    name: "getRoleAdmin",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "account", type: "address" }
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "account", type: "address" }
    ],
    name: "hasRole",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "paymentTokenAddress", type: "address" },
      { internalType: "uint256", name: "evaluatorFeeBP_", type: "uint256" },
      { internalType: "uint256", name: "platformFeeBP_", type: "uint256" },
      { internalType: "address", name: "platformTreasury_", type: "address" }
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "jobId", type: "uint256" },
      { internalType: "address", name: "account", type: "address" }
    ],
    name: "isJobEvaluator",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "jobCounter",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "jobId", type: "uint256" },
      { internalType: "uint8", name: "phase", type: "uint8" },
      { internalType: "uint256", name: "", type: "uint256" }
    ],
    name: "jobMemoIds",
    outputs: [{ internalType: "uint256", name: "memoIds", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "jobs",
    outputs: [
      { internalType: "uint256", name: "id", type: "uint256" },
      { internalType: "address", name: "client", type: "address" },
      { internalType: "address", name: "provider", type: "address" },
      { internalType: "uint256", name: "budget", type: "uint256" },
      { internalType: "uint256", name: "amountClaimed", type: "uint256" },
      { internalType: "uint8", name: "phase", type: "uint8" },
      { internalType: "uint256", name: "memoCount", type: "uint256" },
      { internalType: "uint256", name: "expiredAt", type: "uint256" },
      { internalType: "address", name: "evaluator", type: "address" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "memoCounter",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "numEvaluatorsPerJob",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "paymentToken",
    outputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "platformFeeBP",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "platformTreasury",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "callerConfirmation", type: "address" }
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "account", type: "address" }
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "jobId", type: "uint256" },
      { internalType: "uint256", name: "amount", type: "uint256" }
    ],
    name: "setBudget",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "memoId", type: "uint256" },
      { internalType: "bool", name: "isApproved", type: "bool" },
      { internalType: "string", name: "reason", type: "string" }
    ],
    name: "signMemo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "memoId", type: "uint256" },
      { internalType: "address", name: "signer", type: "address" }
    ],
    name: "signatories",
    outputs: [{ internalType: "uint8", name: "res", type: "uint8" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "evaluatorFeeBP_", type: "uint256" }
    ],
    name: "updateEvaluatorFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "platformFeeBP_", type: "uint256" },
      { internalType: "address", name: "platformTreasury_", type: "address" }
    ],
    name: "updatePlatformFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];
var acpAbi_default = ACP_ABI;

// src/acpClient.ts
import { parseEther } from "viem";
import { io } from "socket.io-client";

// src/acpContractClient.ts
import { LocalAccountSigner } from "@aa-sdk/core";
import { alchemy } from "@account-kit/infra";
import {
  createModularAccountV2Client
} from "@account-kit/smart-contracts";

// src/configs.ts
import { baseSepolia, base } from "@account-kit/infra";
var baseSepoliaAcpConfig = {
  chain: baseSepolia,
  contractAddress: "0x2422c1c43451Eb69Ff49dfD39c4Dc8C5230fA1e6",
  virtualsTokenAddress: "0xbfAB80ccc15DF6fb7185f9498d6039317331846a",
  alchemyRpcUrl: "https://alchemy-proxy.virtuals.io/api/proxy/rpc",
  acpUrl: "https://acpx-staging.virtuals.io"
};
var baseAcpConfig = {
  chain: base,
  contractAddress: "0x6a1FE26D54ab0d3E1e3168f2e0c0cDa5cC0A0A4A",
  virtualsTokenAddress: "0x0b3e328455c4059EEb9e3f84b5543F74E24e7E1b",
  alchemyRpcUrl: "https://alchemy-proxy-prod.virtuals.io/api/proxy/rpc",
  acpUrl: "https://acpx.virtuals.io"
};

// src/acpContractClient.ts
import { encodeFunctionData, erc20Abi, fromHex } from "viem";
var MemoType = /* @__PURE__ */ ((MemoType2) => {
  MemoType2[MemoType2["MESSAGE"] = 0] = "MESSAGE";
  MemoType2[MemoType2["CONTEXT_URL"] = 1] = "CONTEXT_URL";
  MemoType2[MemoType2["IMAGE_URL"] = 2] = "IMAGE_URL";
  MemoType2[MemoType2["VOICE_URL"] = 3] = "VOICE_URL";
  MemoType2[MemoType2["OBJECT_URL"] = 4] = "OBJECT_URL";
  MemoType2[MemoType2["TXHASH"] = 5] = "TXHASH";
  return MemoType2;
})(MemoType || {});
var AcpJobPhases = /* @__PURE__ */ ((AcpJobPhases2) => {
  AcpJobPhases2[AcpJobPhases2["REQUEST"] = 0] = "REQUEST";
  AcpJobPhases2[AcpJobPhases2["NEGOTIATION"] = 1] = "NEGOTIATION";
  AcpJobPhases2[AcpJobPhases2["TRANSACTION"] = 2] = "TRANSACTION";
  AcpJobPhases2[AcpJobPhases2["EVALUATION"] = 3] = "EVALUATION";
  AcpJobPhases2[AcpJobPhases2["COMPLETED"] = 4] = "COMPLETED";
  AcpJobPhases2[AcpJobPhases2["REJECTED"] = 5] = "REJECTED";
  return AcpJobPhases2;
})(AcpJobPhases || {});
var AcpContractClient = class _AcpContractClient {
  constructor(walletPrivateKey, sessionEntityKeyId, agentWalletAddress, config = baseAcpConfig) {
    this.walletPrivateKey = walletPrivateKey;
    this.sessionEntityKeyId = sessionEntityKeyId;
    this.agentWalletAddress = agentWalletAddress;
    this.config = config;
    this.chain = config.chain;
    this.contractAddress = config.contractAddress;
    this.virtualsTokenAddress = config.virtualsTokenAddress;
  }
  static build(_0, _1, _2) {
    return __async(this, arguments, function* (walletPrivateKey, sessionEntityKeyId, agentWalletAddress, config = baseAcpConfig) {
      const acpContractClient = new _AcpContractClient(
        walletPrivateKey,
        sessionEntityKeyId,
        agentWalletAddress,
        config
      );
      yield acpContractClient.init();
      return acpContractClient;
    });
  }
  init() {
    return __async(this, null, function* () {
      const sessionKeySigner = LocalAccountSigner.privateKeyToAccountSigner(this.walletPrivateKey);
      this._sessionKeyClient = yield createModularAccountV2Client({
        chain: this.chain,
        transport: alchemy({
          rpcUrl: this.config.alchemyRpcUrl
        }),
        signer: sessionKeySigner,
        policyId: "186aaa4a-5f57-4156-83fb-e456365a8820",
        accountAddress: this.agentWalletAddress,
        signerEntity: {
          entityId: this.sessionEntityKeyId,
          isGlobalValidation: true
        }
      });
    });
  }
  get sessionKeyClient() {
    if (!this._sessionKeyClient) {
      throw new Error("Session key client not initialized");
    }
    return this._sessionKeyClient;
  }
  get walletAddress() {
    return this.sessionKeyClient.account.address;
  }
  getJobId(hash) {
    return __async(this, null, function* () {
      const result = yield this.sessionKeyClient.getUserOperationReceipt(hash);
      if (!result) {
        throw new Error("Failed to get user operation receipt");
      }
      const contractLogs = result.logs.find(
        (log) => log.address.toLowerCase() === this.contractAddress.toLowerCase()
      );
      if (!contractLogs) {
        throw new Error("Failed to get contract logs");
      }
      return fromHex(contractLogs.data, "number");
    });
  }
  createJob(providerAddress, evaluatorAddress, expireAt) {
    return __async(this, null, function* () {
      try {
        const data = encodeFunctionData({
          abi: acpAbi_default,
          functionName: "createJob",
          args: [
            providerAddress,
            evaluatorAddress,
            Math.floor(expireAt.getTime() / 1e3)
          ]
        });
        const { hash } = yield this.sessionKeyClient.sendUserOperation({
          uo: {
            target: this.contractAddress,
            data
          }
        });
        yield this.sessionKeyClient.waitForUserOperationTransaction({
          hash
        });
        const jobId = yield this.getJobId(hash);
        return { txHash: hash, jobId };
      } catch (error) {
        console.error(error);
        throw new Error("Failed to create job");
      }
    });
  }
  approveAllowance(priceInWei) {
    return __async(this, null, function* () {
      const data = encodeFunctionData({
        abi: erc20Abi,
        functionName: "approve",
        args: [this.contractAddress, priceInWei]
      });
      const { hash } = yield this.sessionKeyClient.sendUserOperation({
        uo: {
          target: this.virtualsTokenAddress,
          data
        }
      });
      yield this.sessionKeyClient.waitForUserOperationTransaction({
        hash
      });
      return hash;
    });
  }
  createMemo(jobId, content, type, isSecured, nextPhase) {
    return __async(this, null, function* () {
      let retries = 3;
      while (retries > 0) {
        try {
          const data = encodeFunctionData({
            abi: acpAbi_default,
            functionName: "createMemo",
            args: [jobId, content, type, isSecured, nextPhase]
          });
          const { hash } = yield this.sessionKeyClient.sendUserOperation({
            uo: {
              target: this.contractAddress,
              data
            }
          });
          yield this.sessionKeyClient.waitForUserOperationTransaction({
            hash
          });
          return hash;
        } catch (error) {
          console.error(`failed to create memo ${jobId} ${content} ${error}`);
          retries -= 1;
          yield new Promise((resolve) => setTimeout(resolve, 2e3 * retries));
        }
      }
      throw new Error("Failed to create memo");
    });
  }
  signMemo(memoId, isApproved, reason) {
    return __async(this, null, function* () {
      let retries = 3;
      while (retries > 0) {
        try {
          const data = encodeFunctionData({
            abi: acpAbi_default,
            functionName: "signMemo",
            args: [memoId, isApproved, reason]
          });
          const { hash } = yield this.sessionKeyClient.sendUserOperation({
            uo: {
              target: this.contractAddress,
              data
            }
          });
          yield this.sessionKeyClient.waitForUserOperationTransaction({
            hash
          });
          return hash;
        } catch (error) {
          console.error(`failed to sign memo ${error}`);
          retries -= 1;
          yield new Promise((resolve) => setTimeout(resolve, 2e3 * retries));
        }
      }
      throw new Error("Failed to sign memo");
    });
  }
  setBudget(jobId, budget) {
    return __async(this, null, function* () {
      try {
        const data = encodeFunctionData({
          abi: acpAbi_default,
          functionName: "setBudget",
          args: [jobId, budget]
        });
        const { hash } = yield this.sessionKeyClient.sendUserOperation({
          uo: {
            target: this.contractAddress,
            data
          }
        });
        yield this.sessionKeyClient.waitForUserOperationTransaction({
          hash
        });
        return hash;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to set budget");
      }
    });
  }
};
var acpContractClient_default = AcpContractClient;

// src/acpJob.ts
var AcpJob = class {
  constructor(acpClient, id, clientAddress, providerAddress, evaluatorAddress, price, memos, phase, context) {
    this.acpClient = acpClient;
    this.id = id;
    this.clientAddress = clientAddress;
    this.providerAddress = providerAddress;
    this.evaluatorAddress = evaluatorAddress;
    this.price = price;
    this.memos = memos;
    this.phase = phase;
    this.context = context;
  }
  get serviceRequirement() {
    var _a;
    return (_a = this.memos.find((m) => m.nextPhase === 1 /* NEGOTIATION */)) == null ? void 0 : _a.content;
  }
  get deliverable() {
    var _a;
    return (_a = this.memos.find((m) => m.nextPhase === 4 /* COMPLETED */)) == null ? void 0 : _a.content;
  }
  get providerAgent() {
    return this.acpClient.getAgent(this.providerAddress);
  }
  get clientAgent() {
    return this.acpClient.getAgent(this.clientAddress);
  }
  get evaluatorAgent() {
    return this.acpClient.getAgent(this.evaluatorAddress);
  }
  pay(amount, reason) {
    return __async(this, null, function* () {
      const memo = this.memos.find(
        (m) => m.nextPhase === 2 /* TRANSACTION */
      );
      if (!memo) {
        throw new Error("No transaction memo found");
      }
      return yield this.acpClient.payJob(this.id, amount, memo.id, reason);
    });
  }
  respond(accept, reason) {
    return __async(this, null, function* () {
      const memo = this.memos.find(
        (m) => m.nextPhase === 1 /* NEGOTIATION */
      );
      if (!memo) {
        throw new Error("No negotiation memo found");
      }
      return yield this.acpClient.respondJob(this.id, memo.id, accept, reason);
    });
  }
  deliver(deliverable) {
    return __async(this, null, function* () {
      const memo = this.memos.find(
        (m) => m.nextPhase === 3 /* EVALUATION */
      );
      if (!memo) {
        throw new Error("No transaction memo found");
      }
      return yield this.acpClient.deliverJob(this.id, deliverable);
    });
  }
  evaluate(accept, reason) {
    return __async(this, null, function* () {
      const memo = this.memos.find((m) => m.nextPhase === 4 /* COMPLETED */);
      if (!memo) {
        throw new Error("No evaluation memo found");
      }
      return yield this.acpClient.acpContractClient.signMemo(
        memo.id,
        accept,
        reason
      );
    });
  }
};
var acpJob_default = AcpJob;

// src/acpMemo.ts
var AcpMemo = class {
  constructor(acpClient, id, type, content, nextPhase) {
    this.acpClient = acpClient;
    this.id = id;
    this.type = type;
    this.content = content;
    this.nextPhase = nextPhase;
  }
  create(jobId, isSecured = true) {
    return __async(this, null, function* () {
      return yield this.acpClient.acpContractClient.createMemo(
        jobId,
        this.content,
        this.type,
        isSecured,
        this.nextPhase
      );
    });
  }
  sign(approved, reason) {
    return __async(this, null, function* () {
      return yield this.acpClient.acpContractClient.signMemo(
        this.id,
        approved,
        reason
      );
    });
  }
};
var acpMemo_default = AcpMemo;

// src/acpJobOffering.ts
import Ajv from "ajv";
var AcpJobOffering = class {
  constructor(acpClient, providerAddress, type, price, requirementSchema) {
    this.acpClient = acpClient;
    this.providerAddress = providerAddress;
    this.type = type;
    this.price = price;
    this.requirementSchema = requirementSchema;
    this.ajv = new Ajv({ allErrors: true });
  }
  initiateJob(_0, _1) {
    return __async(this, arguments, function* (serviceRequirement, evaluatorAddress, expiredAt = new Date(Date.now() + 1e3 * 60 * 60 * 24)) {
      if (this.requirementSchema) {
        const validator = this.ajv.compile(this.requirementSchema);
        const valid = validator(serviceRequirement);
        if (!valid) {
          throw new Error(this.ajv.errorsText(validator.errors));
        }
      }
      return yield this.acpClient.initiateJob(
        this.providerAddress,
        serviceRequirement,
        this.price,
        evaluatorAddress,
        expiredAt
      );
    });
  }
};
var acpJobOffering_default = AcpJobOffering;

// src/acpClient.ts
var AcpClient = class {
  constructor(options) {
    this.acpContractClient = options.acpContractClient;
    this.onNewTask = options.onNewTask;
    this.onEvaluate = options.onEvaluate || this.defaultOnEvaluate;
    this.acpUrl = this.acpContractClient.config.acpUrl;
    this.init();
  }
  defaultOnEvaluate(job) {
    return __async(this, null, function* () {
      yield job.evaluate(true, "Evaluated by default");
    });
  }
  init() {
    return __async(this, null, function* () {
      const socket = io(this.acpUrl, {
        auth: __spreadValues(__spreadValues({}, this.onNewTask && {
          walletAddress: this.acpContractClient.walletAddress
        }), this.onEvaluate !== this.defaultOnEvaluate && {
          evaluatorAddress: this.acpContractClient.walletAddress
        })
      });
      socket.on("roomJoined" /* ROOM_JOINED */, (_, callback) => {
        console.log("Joined ACP Room");
        callback(true);
      });
      socket.on(
        "onEvaluate" /* ON_EVALUATE */,
        (data, callback) => __async(this, null, function* () {
          callback(true);
          if (this.onEvaluate) {
            const job = new acpJob_default(
              this,
              data.id,
              data.clientAddress,
              data.providerAddress,
              data.evaluatorAddress,
              data.price,
              data.memos.map((memo) => {
                return new acpMemo_default(
                  this,
                  memo.id,
                  memo.memoType,
                  memo.content,
                  memo.nextPhase
                );
              }),
              data.phase,
              data.context
            );
            this.onEvaluate(job);
          }
        })
      );
      socket.on(
        "onNewTask" /* ON_NEW_TASK */,
        (data, callback) => __async(this, null, function* () {
          callback(true);
          if (this.onNewTask) {
            const job = new acpJob_default(
              this,
              data.id,
              data.clientAddress,
              data.providerAddress,
              data.evaluatorAddress,
              data.price,
              data.memos.map((memo) => {
                return new acpMemo_default(
                  this,
                  memo.id,
                  memo.memoType,
                  memo.content,
                  memo.nextPhase
                );
              }),
              data.phase,
              data.context
            );
            this.onNewTask(job);
          }
        })
      );
      const cleanup = () => __async(this, null, function* () {
        if (socket) {
          socket.disconnect();
        }
        process.exit(0);
      });
      process.on("SIGINT", cleanup);
      process.on("SIGTERM", cleanup);
    });
  }
  browseAgents(keyword, options) {
    return __async(this, null, function* () {
      let { cluster, sort_by, rerank, top_k, graduated } = options;
      rerank = rerank != null ? rerank : true;
      top_k = top_k != null ? top_k : 5;
      graduated = graduated != null ? graduated : true;
      let url = `${this.acpUrl}/api/agents?search=${keyword}`;
      if (sort_by && sort_by.length > 0) {
        url += `&sort=${sort_by.map((s) => s).join(",")}`;
      }
      if (top_k) {
        url += `&top_k=${top_k}`;
      }
      if (rerank) {
        url += `&rerank=true`;
      }
      if (this.acpContractClient.walletAddress) {
        url += `&filters[walletAddress][$notIn]=${this.acpContractClient.walletAddress}`;
      }
      if (cluster) {
        url += `&filters[cluster]=${cluster}`;
      }
      if (graduated === false) {
        url += `&filters[hasGraduated]=false`;
      }
      const response = yield fetch(url);
      const data = yield response.json();
      return data.data.map((agent) => {
        return {
          id: agent.id,
          name: agent.name,
          description: agent.description,
          offerings: agent.offerings.map((offering) => {
            return new acpJobOffering_default(
              this,
              agent.walletAddress,
              offering.name,
              offering.price,
              offering.requirementSchema
            );
          }),
          twitterHandle: agent.twitterHandle,
          walletAddress: agent.walletAddress,
          metrics: agent.metrics
        };
      });
    });
  }
  initiateJob(_0, _1, _2, _3) {
    return __async(this, arguments, function* (providerAddress, serviceRequirement, amount, evaluatorAddress, expiredAt = new Date(Date.now() + 1e3 * 60 * 60 * 24)) {
      const { jobId } = yield this.acpContractClient.createJob(
        providerAddress,
        evaluatorAddress || this.acpContractClient.walletAddress,
        expiredAt
      );
      yield this.acpContractClient.setBudget(
        jobId,
        parseEther(amount.toString())
      );
      yield this.acpContractClient.createMemo(
        jobId,
        typeof serviceRequirement === "string" ? serviceRequirement : JSON.stringify(serviceRequirement),
        0 /* MESSAGE */,
        true,
        1 /* NEGOTIATION */
      );
      return jobId;
    });
  }
  respondJob(jobId, memoId, accept, reason) {
    return __async(this, null, function* () {
      yield this.acpContractClient.signMemo(memoId, accept, reason);
      if (!accept) {
        return;
      }
      return yield this.acpContractClient.createMemo(
        jobId,
        `Job ${jobId} accepted. ${reason != null ? reason : ""}`,
        0 /* MESSAGE */,
        false,
        2 /* TRANSACTION */
      );
    });
  }
  payJob(jobId, amount, memoId, reason) {
    return __async(this, null, function* () {
      yield this.acpContractClient.approveAllowance(
        parseEther(amount.toString())
      );
      yield this.acpContractClient.signMemo(memoId, true, reason);
      return yield this.acpContractClient.createMemo(
        jobId,
        `Payment of ${amount} made. ${reason != null ? reason : ""}`,
        0 /* MESSAGE */,
        false,
        3 /* EVALUATION */
      );
    });
  }
  deliverJob(jobId, deliverable) {
    return __async(this, null, function* () {
      return yield this.acpContractClient.createMemo(
        jobId,
        deliverable,
        4 /* OBJECT_URL */,
        true,
        4 /* COMPLETED */
      );
    });
  }
  getActiveJobs(page = 1, pageSize = 10) {
    return __async(this, null, function* () {
      let url = `${this.acpUrl}/api/jobs/active?pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
      try {
        const response = yield fetch(url, {
          headers: {
            "wallet-address": this.acpContractClient.walletAddress
          }
        });
        const data = yield response.json();
        if (data.error) {
          throw new Error(data.error.message);
        }
        return data.data.map((job) => {
          return new acpJob_default(
            this,
            job.id,
            job.clientAddress,
            job.providerAddress,
            job.evaluatorAddress,
            job.price,
            job.memos.map((memo) => {
              return new acpMemo_default(
                this,
                memo.id,
                memo.memoType,
                memo.content,
                memo.nextPhase
              );
            }),
            job.phase,
            job.context
          );
        });
      } catch (error) {
        throw error;
      }
    });
  }
  getCompletedJobs(page = 1, pageSize = 10) {
    return __async(this, null, function* () {
      let url = `${this.acpUrl}/api/jobs/completed?pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
      try {
        const response = yield fetch(url, {
          headers: {
            "wallet-address": this.acpContractClient.walletAddress
          }
        });
        const data = yield response.json();
        if (data.error) {
          throw new Error(data.error.message);
        }
        return data.data.map((job) => {
          return new acpJob_default(
            this,
            job.id,
            job.clientAddress,
            job.providerAddress,
            job.evaluatorAddress,
            job.price,
            job.memos.map((memo) => {
              return new acpMemo_default(
                this,
                memo.id,
                memo.memoType,
                memo.content,
                memo.nextPhase
              );
            }),
            job.phase,
            job.context
          );
        });
      } catch (error) {
        throw error;
      }
    });
  }
  getCancelledJobs(page = 1, pageSize = 10) {
    return __async(this, null, function* () {
      let url = `${this.acpUrl}/api/jobs/cancelled?pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
      try {
        const response = yield fetch(url, {
          headers: {
            "wallet-address": this.acpContractClient.walletAddress
          }
        });
        const data = yield response.json();
        if (data.error) {
          throw new Error(data.error.message);
        }
        return data.data.map((job) => {
          return new acpJob_default(
            this,
            job.id,
            job.clientAddress,
            job.providerAddress,
            job.evaluatorAddress,
            job.price,
            job.memos.map((memo) => {
              return new acpMemo_default(
                this,
                memo.id,
                memo.memoType,
                memo.content,
                memo.nextPhase
              );
            }),
            job.phase,
            job.context
          );
        });
      } catch (error) {
        throw error;
      }
    });
  }
  getJobById(jobId) {
    return __async(this, null, function* () {
      let url = `${this.acpUrl}/api/jobs/${jobId}`;
      try {
        const response = yield fetch(url, {
          headers: {
            "wallet-address": this.acpContractClient.walletAddress
          }
        });
        const data = yield response.json();
        if (data.error) {
          throw new Error(data.error.message);
        }
        const job = data.data;
        if (!job) {
          return;
        }
        return new acpJob_default(
          this,
          job.id,
          job.clientAddress,
          job.providerAddress,
          job.evaluatorAddress,
          job.price,
          job.memos.map((memo) => {
            return new acpMemo_default(
              this,
              memo.id,
              memo.memoType,
              memo.content,
              memo.nextPhase
            );
          }),
          job.phase,
          job.context
        );
      } catch (error) {
        throw error;
      }
    });
  }
  getMemoById(jobId, memoId) {
    return __async(this, null, function* () {
      let url = `${this.acpUrl}/api/jobs/${jobId}/memos/${memoId}`;
      try {
        const response = yield fetch(url, {
          headers: {
            "wallet-address": this.acpContractClient.walletAddress
          }
        });
        const data = yield response.json();
        if (data.error) {
          throw new Error(data.error.message);
        }
        const memo = data.data;
        if (!memo) {
          return;
        }
        return new acpMemo_default(
          this,
          memo.id,
          memo.memoType,
          memo.content,
          memo.nextPhase
        );
      } catch (error) {
        throw error;
      }
    });
  }
  getAgent(walletAddress) {
    return __async(this, null, function* () {
      const url = `${this.acpUrl}/api/agents?filters[walletAddress]=${walletAddress}`;
      const response = yield fetch(url);
      const data = yield response.json();
      const agents = data.data || [];
      if (agents.length === 0) {
        return;
      }
      return agents[0];
    });
  }
};
var acpClient_default = AcpClient;

// src/interfaces.ts
var AcpAgentSort = /* @__PURE__ */ ((AcpAgentSort2) => {
  AcpAgentSort2["SUCCESSFUL_JOB_COUNT"] = "successfulJobCount";
  AcpAgentSort2["SUCCESS_RATE"] = "successRate";
  AcpAgentSort2["UNIQUE_BUYER_COUNT"] = "uniqueBuyerCount";
  AcpAgentSort2["MINS_FROM_LAST_ONLINE"] = "minsFromLastOnlineTime";
  AcpAgentSort2["IS_ONLINE"] = "isOnline";
  return AcpAgentSort2;
})(AcpAgentSort || {});

// src/index.ts
var index_default = acpClient_default;
export {
  acpAbi_default as ACP_ABI,
  AcpAgentSort,
  acpContractClient_default as AcpContractClient,
  acpJob_default as AcpJob,
  AcpJobPhases,
  acpMemo_default as AcpMemo,
  MemoType,
  baseAcpConfig,
  baseSepoliaAcpConfig,
  index_default as default
};
