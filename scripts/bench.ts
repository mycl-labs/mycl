import { buildRoot } from '../src/utils/merkle';

function bench(n: number) {
  const leaves: Uint8Array[] = [];
  for (let i = 0; i < n; i++) leaves.push(new Uint8Array([i & 0xff, (i >> 8) & 0xff]));
  const t0 = Date.now();
  buildRoot(leaves);
  const t1 = Date.now();
  return t1 - t0;
}

for (const n of [256, 1024, 8192]) {
  const ms = bench(n);
  console.log(`leaves=${n.toString().padStart(5)} root=${ms}ms`);
}
