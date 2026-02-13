import { hexToBytes } from './utils/bytes';
import { verifyProof } from './utils/merkle';
import { ProofError } from './errors';

export interface ProofEnvelope {
  root: string;
  leaf: string;
  path: string[];
  index: number;
}

export function verifyEnvelope(env: ProofEnvelope): boolean {
  try {
    const leaf = hexToBytes(env.leaf);
    const root = hexToBytes(env.root);
    const path = env.path.map(hexToBytes);
    return verifyProof(leaf, path, env.index, root);
  } catch (err) {
    throw new ProofError(`invalid envelope: ${(err as Error).message}`);
  }
}

export function envelopeDepth(env: ProofEnvelope): number { return env.path.length; }

export function describeEnvelope(env: ProofEnvelope): string {
  return `root=${env.root.slice(0, 12)}... index=${env.index} depth=${envelopeDepth(env)}`;
}
