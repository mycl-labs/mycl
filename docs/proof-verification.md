# Proof verification

Every sample surfaced through MYCL can be verified against the latest
tree root without trusting the indexer.

```ts
import { verifyEnvelope } from '@mycl/hypha';

const ok = verifyEnvelope({
  root: '...',
  leaf: '...',
  path: ['...'],
  index: 42,
});
```

The envelope uses hex-encoded SHA-256 digests. Paths are sibling-only,
so depth equals `log2(leafCount)` (rounded up).

## Hex prefixes

All hex values in envelopes are unprefixed. Callers that produce `0x`-prefixed
strings should strip the prefix before verifying.
