import { Feed } from '../src/feed';

describe('Feed', () => {
  test('appends samples', () => {
    const f = new Feed({
      slug: 'sol.usd.spot', title: 'SOL/USD', category: 'price',
      description: '', publisher: 'mycl-labs', pricePerRead: 0, decimals: 6,
    });
    f.append({ slot: 1, value: 100, ts: 1 });
    expect(f.samples.length).toBe(1);
  });
});
