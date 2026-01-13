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
