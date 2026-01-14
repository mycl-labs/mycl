import { HyphaClient } from '../src';

async function main() {
  const client = new HyphaClient();
  const feeds = await client.listFeeds().catch(() => []);
  console.log('discovered', feeds.length, 'feeds');
  const bonk = feeds.find((f) => f.slug === 'bonk.usd.spot');
  if (!bonk) return;
  const unsub = client.subscribe(bonk, (s) => console.log('bonk tick', s.value));
  setTimeout(unsub, 10_000);
}

if (require.main === module) { main(); }
