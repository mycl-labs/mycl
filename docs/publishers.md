# Publishers

Hypha publishers write compressed batches into the tree. A batch contains
a feed slug, a list of samples, and a Merkle root derived from the samples.

## Minimal publisher

```ts
import { HyphaClient } from '@mycl/hypha';

const client = new HyphaClient();
const feed = client.buildFeed({
  slug: 'pumpfun.launches.v1',
  title: 'pump.fun launches',
  category: 'event',
  description: 'New pool creations on pump.fun.',
  publisher: 'mycl-labs',
  pricePerRead: 0.00005,
  decimals: 0,
});

feed.append({ slot: 312_000_000, value: 1, ts: Date.now() });
await client.publishBatch(feed.encodeBatch());
```

## Batch sizing

Keep batches below `MAX_BATCH_SIZE` (256 samples) for predictable proof depth
and lower transaction fees.
