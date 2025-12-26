import { compress } from '../src/compression';

describe('compression', () => {
  test('adds MYCL header', () => {
    const c = compress(new Uint8Array([1,2,3]));
    expect(c.bytes[0]).toBe(0x4d);
  });
});
