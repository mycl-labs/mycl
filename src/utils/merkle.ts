import { createHash } from 'crypto';

// Simple Merkle tree used to summarise compressed feed batches.
export function hashLeaf(data: Uint8Array): Uint8Array {
  const h = createHash('sha256');
  h.update(Buffer.from([0x00]));
  h.update(Buffer.from(data));
  return new Uint8Array(h.digest());
}

export function hashNode(left: Uint8Array, right: Uint8Array): Uint8Array {
  const h = createHash('sha256');
  h.update(Buffer.from([0x01]));
  h.update(Buffer.from(left));
  h.update(Buffer.from(right));
  return new Uint8Array(h.digest());
}

export function buildRoot(leaves: Uint8Array[]): Uint8Array {
  if (leaves.length === 0) return new Uint8Array(32);
  let level = leaves.map(hashLeaf);
  while (level.length > 1) {
    const next: Uint8Array[] = [];
    for (let i = 0; i < level.length; i += 2) {
      const l = level[i];
      const r = i + 1 < level.length ? level[i + 1] : level[i];
      next.push(hashNode(l, r));
    }
    level = next;
  }
  return level[0];
}

export function buildProof(leaves: Uint8Array[], index: number): Uint8Array[] {
  const proof: Uint8Array[] = [];
  let level = leaves.map(hashLeaf);
  let idx = index;
  while (level.length > 1) {
    const sibIdx = idx ^ 1;
    proof.push(sibIdx < level.length ? level[sibIdx] : level[idx]);
    const next: Uint8Array[] = [];
    for (let i = 0; i < level.length; i += 2) {
      const l = level[i];
      const r = i + 1 < level.length ? level[i + 1] : level[i];
      next.push(hashNode(l, r));
    }
    level = next;
    idx = Math.floor(idx / 2);
  }
  return proof;
}

export function verifyProof(leaf: Uint8Array, proof: Uint8Array[], index: number, root: Uint8Array): boolean {
  let current = hashLeaf(leaf);
  let idx = index;
  for (const sib of proof) {
    current = (idx & 1) === 0 ? hashNode(current, sib) : hashNode(sib, current);
    idx = Math.floor(idx / 2);
  }
  if (current.length !== root.length) return false;
  for (let i = 0; i < current.length; i++) if (current[i] !== root[i]) return false;
  return true;
}
