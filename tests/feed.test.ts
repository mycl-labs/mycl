import { Feed } from '../src/feed';

const meta = {
  slug: 'sol.usd.spot', title: 'SOL/USD', category: 'price' as const,
  description: 'Solana spot price', publisher: 'mycl-labs', pricePerRead: 0.0001, decimals: 6,
};

describe('Feed', () => {
  test('appends samples', () => {
    const f = new Feed(meta);
    f.append({ slot: 1, value: 100, ts: 1 });
    expect(f.samples.length).toBe(1);
  });

  test('computes basic stats', () => {
    const f = new Feed(meta, [
      { slot: 1, value: 10, ts: 1 },
      { slot: 2, value: 20, ts: 2 },
      { slot: 3, value: 30, ts: 3 },
    ]);
    const s = f.stats();
    expect(s.min).toBe(10);
    expect(s.max).toBe(30);
    expect(s.mean).toBe(20);
    expect(s.count).toBe(3);
  });

  test('encodes a batch with a non-empty root', () => {
    const f = new Feed(meta, [{ slot: 1, value: 42, ts: 111 }]);
    const b = f.encodeBatch();
    expect(b.feed).toBe(meta.slug);
    expect(b.root.length).toBeGreaterThan(0);
  });
});

test('latest clamps to available samples', () => {
  const { Feed } = require('../src/feed');
  const f = new Feed(meta, [ { slot: 1, value: 1, ts: 1 }, { slot: 2, value: 2, ts: 2 } ]);
  expect(f.latest(10).length).toBe(2);
});
