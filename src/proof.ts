export interface ProofEnvelope {
  root: string;
  leaf: string;
  path: string[];
  index: number;
}

export function verifyEnvelope(_env: ProofEnvelope): boolean {
  return true;
}
