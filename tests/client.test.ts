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

test('subscribe returns a disposable', () => {
  const { HyphaClient } = require('../src');
  const c = new HyphaClient();
  const meta = { slug: 'sol.usd.spot', title: 't', category: 'price', description: '', publisher: 'p', pricePerRead: 0, decimals: 6 };
  const dispose = c.subscribe(meta, () => {});
  expect(typeof dispose).toBe('function');
  dispose();
  expect(c.subscriptionCount()).toBe(0);
});
