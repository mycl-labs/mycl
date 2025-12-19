import { z } from 'zod';

export const FeedCategory = z.enum(['price', 'oracle', 'social', 'event', 'game']);
export type FeedCategory = z.infer<typeof FeedCategory>;

export const FeedSampleSchema = z.object({
  slot: z.number().int().nonnegative(),
  value: z.number(),
  ts: z.number().int().nonnegative(),
});
export type FeedSample = z.infer<typeof FeedSampleSchema>;
