import { z } from 'zod';

export const FeedCategory = z.enum(['price', 'oracle', 'social', 'event', 'game', 'nft']);
export type FeedCategory = z.infer<typeof FeedCategory>;

export const FeedSampleSchema = z.object({
  slot: z.number().int().nonnegative(),
  value: z.number(),
  ts: z.number().int().nonnegative(),
  publisher: z.string().optional(),
});
export type FeedSample = z.infer<typeof FeedSampleSchema>;

export const FeedMetadataSchema = z.object({
  slug: z.string().min(3).max(64),
  title: z.string().min(1).max(120),
  category: FeedCategory,
  description: z.string().max(500),
  publisher: z.string(),
  pricePerRead: z.number().nonnegative(),
  decimals: z.number().int().min(0).max(18).default(6),
  updatedAt: z.number().int().nonnegative().optional(),
});
export type FeedMetadata = z.infer<typeof FeedMetadataSchema>;

export const FeedBatchSchema = z.object({
  feed: z.string(),
  samples: z.array(FeedSampleSchema).min(1),
  root: z.string(),
  signature: z.string().optional(),
});
export type FeedBatch = z.infer<typeof FeedBatchSchema>;
