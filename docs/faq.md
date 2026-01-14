# FAQ

### Why build on compressed state trees?
Plain Solana accounts charge rent per byte. Compressed accounts push the
storage cost down by roughly three orders of magnitude, which is what makes
long-tail data feeds economically viable.

### Is MYCL a replacement for Pyth or Switchboard?
No. Pyth and Switchboard cover major financial primitives extremely well.
MYCL targets the long tail: niche indices, on-chain telemetry, game events,
and community-operated feeds.

### Do I need to run my own RPC?
Not for development. Any Light Protocol Photon endpoint works. In production
we recommend pinning to a dedicated endpoint for stable latency.

### Where does the token fit in?
`$MYCL` is a utility token for read credits, publisher staking, and governance
of the protocol fee split. It is not required to consume the SDK.
