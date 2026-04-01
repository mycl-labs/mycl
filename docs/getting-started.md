# Getting started

```bash
git clone https://github.com/mycl-labs/mycl.git
cd mycl
npm install
npm run build
```

## Initialise the client

```ts
import { HyphaClient } from '@mycl/hypha';

const client = new HyphaClient({ endpoint: process.env.LIGHT_RPC_URL });
const feeds = await client.listFeeds();
```

## Run the bundled examples

```bash
npx ts-node examples/publish-price-feed.ts
npx ts-node examples/subscribe-bot.ts
```

## Troubleshooting

If `npm run build` complains about TypeScript versions, pin `typescript@5.5.x`
in your environment and clear `node_modules` before retrying.

The examples folder is driven by `ts-node`; pin `ts-node@10.9.x` for consistent
behaviour across platforms.
