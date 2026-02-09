import { concatBytes, equalBytes } from './utils/bytes';
import { CompressionError } from './errors';

const HEADER = new Uint8Array([0x4d, 0x59, 0x43, 0x4c]); // 'MYCL'

export interface CompressedPayload {
  bytes: Uint8Array;
  originalSize: number;
  compressionRatio: number;
}

export function compress(input: Uint8Array): CompressedPayload {
  // Small RLE over raw bytes. Good enough for streaming numeric samples.
  const body = dedupeRuns(input);
  const bytes = concatBytes(HEADER, body);
  return {
    bytes,
    originalSize: input.length,
    compressionRatio: input.length === 0 ? 1 : bytes.length / input.length,
  };
}

export function decompress(payload: CompressedPayload): Uint8Array {
  const head = payload.bytes.slice(0, 4);
  if (!equalBytes(head, HEADER)) {
    throw new CompressionError('missing MYCL header');
  }
  return inflateRuns(payload.bytes.slice(4));
}

function dedupeRuns(input: Uint8Array): Uint8Array {
  const out: number[] = [];
  let i = 0;
  while (i < input.length) {
    let run = 1;
    while (i + run < input.length && input[i + run] === input[i] && run < 254) run++;
    out.push(run, input[i]);
    i += run;
  }
  return Uint8Array.from(out);
}

function inflateRuns(input: Uint8Array): Uint8Array {
  const out: number[] = [];
  for (let i = 0; i + 1 < input.length; i += 2) {
    const run = input[i];
    const byte = input[i + 1];
    for (let j = 0; j < run; j++) out.push(byte);
  }
  return Uint8Array.from(out);
}
