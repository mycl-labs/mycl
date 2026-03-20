export { HyphaClient } from './client';
export type { HyphaClientOptions } from './client';
export { Feed } from './feed';
export { SubscriptionManager } from './subscribe';
export type { SampleHandler } from './subscribe';
export { compress, decompress } from './compression';
export type { CompressedPayload } from './compression';
export { verifyEnvelope, describeEnvelope } from './proof';
export type { ProofEnvelope } from './proof';
export { rpcCall } from './transport';
export type { TransportOptions } from './transport';
export { FeedCategory, FeedSampleSchema, FeedMetadataSchema, FeedBatchSchema } from './schema';
export type { FeedSample, FeedMetadata, FeedBatch } from './schema';
export { HyphaError, CompressionError, ProofError, TransportError, SubscriptionError } from './errors';
export {
  PROTOCOL_NAME,
  PROTOCOL_VERSION,
  DEFAULT_RPC,
  LIGHT_PHOTON_RPC,
  FEED_ROOT_SEED,
  MAX_BATCH_SIZE,
} from './constants';
