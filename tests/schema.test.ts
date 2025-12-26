import { FeedSampleSchema } from '../src/schema';

describe('schema', () => {
  test('FeedSampleSchema accepts a basic sample', () => {
    const s = FeedSampleSchema.parse({ slot: 1, value: 100, ts: 0 });
    expect(s.value).toBe(100);
  });
});
