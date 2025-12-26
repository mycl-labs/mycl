import { HyphaClient } from '../src';

describe('HyphaClient', () => {
  test('defaults to Light Photon RPC endpoint', () => {
    const c = new HyphaClient();
    expect(c.endpoint).toMatch(/^https?:\/\//);
  });
});
