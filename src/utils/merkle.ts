import { createHash } from 'crypto';

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
