import { HyphaClient, LIGHT_PHOTON_RPC } from '../src';

describe('HyphaClient', () => {
  test('defaults to Light Photon RPC endpoint', () => {
    const c = new HyphaClient();
    expect(c.endpoint).toBe(LIGHT_PHOTON_RPC);
  });

  test('accepts a custom endpoint', () => {
    const c = new HyphaClient({ endpoint: 'https://rpc.example/' });
    expect(c.endpoint).toBe('https://rpc.example/');
  });

  test('tracks zero active subscriptions on init', () => {
    const c = new HyphaClient();
    expect(c.subscriptionCount()).toBe(0);
  });
});
