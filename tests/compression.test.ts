import { compress, decompress } from '../src/compression';

describe('compression', () => {
  test('adds MYCL header', () => {
    const c = compress(new Uint8Array([1, 2, 3]));
    expect(c.bytes[0]).toBe(0x4d);
    expect(c.bytes[1]).toBe(0x59);
    expect(c.bytes[2]).toBe(0x43);
    expect(c.bytes[3]).toBe(0x4c);
  });

  test('round trip on repeating bytes', () => {
    const input = new Uint8Array([7, 7, 7, 7, 0, 0, 1]);
    const c = compress(input);
    const back = decompress(c);
    expect(Array.from(back)).toEqual(Array.from(input));
  });

  test('empty input keeps header', () => {
    const c = compress(new Uint8Array([]));
    expect(c.bytes.length).toBe(4);
    expect(c.originalSize).toBe(0);
  });
});
