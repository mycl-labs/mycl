import { concatBytes } from './utils/bytes';

export interface CompressedPayload {
  bytes: Uint8Array;
  originalSize: number;
}

export function compress(input: Uint8Array): CompressedPayload {
  // Placeholder: a real impl calls into Light Protocol compression.
  const header = new Uint8Array([0x4d, 0x59, 0x43, 0x4c]); // 'MYCL'
  return { bytes: concatBytes(header, input), originalSize: input.length };
}
