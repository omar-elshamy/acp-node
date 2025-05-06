import { Address, parseEther } from "viem";
import AcpContractClient, { AcpJobPhases, MemoType } from "./acpContractClient";

type AcpAgent = {
  id: number;
  documentId: string;
  name: string;
  description: string;
  walletAddress: Address;
  isVirtualAgent: boolean;
  profilePic: string;
  category: string;
  tokenAddress: string | null;
  ownerAddress: string;
  cluster: string | null;
  twitterHandle: string;
  offerings: { name: string; price: number }[];
  symbol: string | null;
  virtualAgentId: string | null;
};

class AcpClient {
  private acpUrl;

  constructor(public acpContractClient: AcpContractClient) {
    this.acpUrl = this.acpContractClient.config.acpUrl;
    this.init();
  }

  async init() {
    // TODO: implement socket
  }

  async browseAgent(keyword: string, cluster?: string) {
    let url = `${this.acpUrl}/agents?search=${keyword}&filters[walletAddress][$neq]=${this.acpContractClient.walletAddress}`;
    if (cluster) {
      url += `&filters[cluster]=${cluster}`;
    }

    const response = await fetch(url);
    const data: {
      data: AcpAgent[];
    } = await response.json();

    return data.data.map((agent) => {
      return {
        id: agent.id,
        name: agent.name,
        description: agent.description,
        offerings: agent.offerings,
        twitterHandle: agent.twitterHandle,
        walletAddress: agent.walletAddress,
      };
    });
  }

  async initiateJob(
    providerAddress: Address,
    serviceRequirement: string,
    expiredAt: Date = new Date(Date.now() + 1000 * 60 * 60 * 24),
    evaluatorAddress?: Address
  ) {
    const { jobId } = await this.acpContractClient.createJob(
      providerAddress,
      evaluatorAddress || this.acpContractClient.walletAddress,
      expiredAt
    );

    await this.acpContractClient.createMemo(
      jobId,
      serviceRequirement,
      MemoType.MESSAGE,
      true,
      AcpJobPhases.NEGOTIOATION
    );

    return jobId;
  }

  async respondJob(memoId: number, accept: boolean, reason?: string) {
    return await this.acpContractClient.signMemo(memoId, accept, reason);
  }

  async payJob(jobId: number, amount: number) {
    await this.acpContractClient.setBudget(
      jobId,
      parseEther(amount.toString())
    );

    return await this.acpContractClient.approveAllowance(
      parseEther(amount.toString())
    );
  }

  async deliverJob(jobId: number, deliverable: string) {
    return await this.acpContractClient.createMemo(
      jobId,
      deliverable,
      MemoType.OBJECT_URL,
      true,
      AcpJobPhases.COMPLETED
    );
  }

  async getActiveJobs() {
    // TODO: to implement
  }

  async getCompletedJobs() {
    // TODO: to implement
  }

  async getCancelledJobs() {
    // TODO: to imp
  }
}

export default AcpClient;
