import { TransportOptions } from './transport';

export interface HyphaClientOptions {
  endpoint: string;
}

export class HyphaClient {
  private readonly transport: TransportOptions;
  constructor(opts: HyphaClientOptions) {
    this.transport = { endpoint: opts.endpoint };
  }

  getEndpoint(): string {
    return this.transport.endpoint;
  }
}
