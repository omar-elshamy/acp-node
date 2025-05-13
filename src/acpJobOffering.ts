import { Address } from "viem";
import AcpClient from "./acpClient";
import Ajv, { JSONSchemaType } from "ajv";

class AcpJobOffering {
  private ajv: Ajv;
  public schema: JSONSchemaType<any>;

  constructor(
    private readonly acpClient: AcpClient,
    public providerAddress: Address,
    public type: string,
    public price: number,
    schema: string
  ) {
    this.ajv = new Ajv();
    this.schema = JSON.parse(schema);
  }

  async initiateJob(serviceRequirement: Object | string, expiredAt: Date) {
    if (this.schema) {
      const validate = this.ajv.compile(this.schema);
      const valid = validate(serviceRequirement);

      if (!valid) {
        throw new Error("Invalid service requirement");
      }
    }

    return await this.acpClient.initiateJob(
      this.providerAddress,
      serviceRequirement,
      expiredAt
    );
  }
}

export default AcpJobOffering;
