import { buildRoot, buildProof, verifyProof } from '../src/utils/merkle';

describe('merkle', () => {
  test('root length is 32 bytes', () => {
    const root = buildRoot([new Uint8Array([1]), new Uint8Array([2])]);
    expect(root.length).toBe(32);
  });

  test('proof verifies for each leaf', () => {
    const leaves = [
      new Uint8Array([1]),
      new Uint8Array([2]),
      new Uint8Array([3]),
      new Uint8Array([4]),
    ];
    const root = buildRoot(leaves);
    for (let i = 0; i < leaves.length; i++) {
      const proof = buildProof(leaves, i);
      expect(verifyProof(leaves[i], proof, i, root)).toBe(true);
    }
  });

  test('proof fails on wrong leaf', () => {
    const leaves = [new Uint8Array([1]), new Uint8Array([2])];
    const root = buildRoot(leaves);
    const proof = buildProof(leaves, 0);
    expect(verifyProof(new Uint8Array([9]), proof, 0, root)).toBe(false);
  });
});
