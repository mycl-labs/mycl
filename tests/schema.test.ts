import { FeedSampleSchema, FeedMetadataSchema, FeedBatchSchema } from '../src/schema';

describe('schema', () => {
  test('FeedSampleSchema accepts a basic sample', () => {
    const s = FeedSampleSchema.parse({ slot: 1, value: 100, ts: 0 });
    expect(s.value).toBe(100);
  });

  test('FeedMetadataSchema enforces slug bounds', () => {
    expect(() => FeedMetadataSchema.parse({
      slug: 'x', title: 't', category: 'price',
      description: '', publisher: 'p', pricePerRead: 0, decimals: 6,
    })).toThrow();
  });

  test('FeedBatchSchema requires at least one sample', () => {
    expect(() => FeedBatchSchema.parse({
      feed: 'sol.usd.spot', samples: [], root: '00',
    })).toThrow();
  });
});

test('FeedCategory includes nft once added', () => {
  const { FeedCategory } = require('../src/schema');
  expect(FeedCategory.options).toContain('nft');
});
