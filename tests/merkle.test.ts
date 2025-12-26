import { buildRoot } from '../src/utils/merkle';

describe('merkle', () => {
  test('root length is 32 bytes', () => {
    const root = buildRoot([new Uint8Array([1]), new Uint8Array([2])]);
    expect(root.length).toBe(32);
  });
});
