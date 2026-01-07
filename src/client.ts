import { rpcCall, TransportOptions } from './transport';
import { FeedBatch, FeedBatchSchema, FeedMetadata, FeedMetadataSchema, FeedSample } from './schema';
import { SubscriptionManager, SampleHandler } from './subscribe';
import { Feed } from './feed';
import { LIGHT_PHOTON_RPC } from './constants';

export interface HyphaClientOptions {
  endpoint?: string;
  retries?: number;
  backoffMs?: number;
  timeoutMs?: number;
  fetchImpl?: typeof fetch;
}

export class HyphaClient {
  private readonly transport: TransportOptions;
  private readonly subs = new SubscriptionManager();

  constructor(opts: HyphaClientOptions = {}) {
    this.transport = {
      endpoint: opts.endpoint ?? LIGHT_PHOTON_RPC,
      retries: opts.retries,
      backoffMs: opts.backoffMs,
      timeoutMs: opts.timeoutMs,
      fetchImpl: opts.fetchImpl,
    };
  }

  get endpoint(): string {
    return this.transport.endpoint;
  }

  async listFeeds(): Promise<FeedMetadata[]> {
    const result = await rpcCall<FeedMetadata[]>(this.transport, 'mycl_listFeeds', []);
    return result.map((m) => FeedMetadataSchema.parse(m));
  }

  async getFeed(slug: string): Promise<FeedMetadata> {
    const result = await rpcCall<FeedMetadata>(this.transport, 'mycl_getFeed', [slug]);
    return FeedMetadataSchema.parse(result);
  }

  async publishBatch(batch: FeedBatch): Promise<{ signature: string }>{
    const parsed = FeedBatchSchema.parse(batch);
    return rpcCall(this.transport, 'mycl_publishBatch', [parsed]);
  }

  async fetchSamples(slug: string, limit = 100): Promise<FeedSample[]> {
    return rpcCall(this.transport, 'mycl_getSamples', [slug, limit]);
  }

  subscribe(meta: FeedMetadata, handler: SampleHandler): () => void {
    return this.subs.subscribe(meta, handler);
  }

  subscriptionCount(): number {
    return this.subs.size();
  }

  buildFeed(meta: FeedMetadata, samples: FeedSample[] = []): Feed {
    return new Feed(meta, samples);
  }
}
