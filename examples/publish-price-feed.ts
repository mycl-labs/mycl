import { HyphaClient, Feed } from '../src';

async function main() {
  const client = new HyphaClient();
  const feed = client.buildFeed({
    slug: 'sol.usd.spot',
    title: 'SOL/USD spot',
    category: 'price',
    description: 'High-frequency SOL/USD mid price compressed feed.',
    publisher: 'mycl-labs',
    pricePerRead: 0.0001,
    decimals: 6,
  });
  feed.append({ slot: 312_000_000, value: 142.55, ts: Date.now() });
  feed.append({ slot: 312_000_001, value: 142.60, ts: Date.now() });
  const batch = feed.encodeBatch();
  console.log('publishing batch with root', batch.root, 'samples=', batch.samples.length);
}

if (require.main === module) { main().catch((e) => { console.error(e); process.exit(1); }); }
