# Subscribers

Consumers fetch recent samples or subscribe for streaming updates.

## Pull recent samples

```ts
const samples = await client.fetchSamples('sol.usd.spot', 100);
```

## Stream with a handler

```ts
const meta = await client.getFeed('bonk.usd.spot');
const unsub = client.subscribe(meta, (s) => console.log(s.value));
```

Each sample carries a slot and a publisher timestamp. Use `slot` for ordering
within Solana's chain view and `ts` for wall-clock display.

## Backpressure

Handlers run synchronously. If your handler is slow, wrap it in a queue so
the publisher transport does not stall while you process samples.
