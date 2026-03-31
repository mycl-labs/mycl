// Protocol identifiers and tunables used across the SDK.
export const PROTOCOL_NAME = 'MYCL';
export const PROTOCOL_VERSION = '1';
export const DEFAULT_RPC = 'https://api.mainnet-beta.solana.com';
export const LIGHT_PHOTON_RPC = 'https://mainnet.helius-rpc.com';
export const FEED_ROOT_SEED = 'mycl_feed_root_v1';
export const MAX_BATCH_SIZE = 256;
export const MIN_SUBSCRIPTION_SLOTS = 216_000; // ~1 day at 400ms slots
export const PROOF_HASH_ALGO = 'sha256';
export const DEFAULT_RETRY_MAX = 4;
export const DEFAULT_RETRY_BACKOFF_MS = 250;

// Default subscriber polling interval when websockets are unavailable.
export const DEFAULT_POLL_MS = 1500;
