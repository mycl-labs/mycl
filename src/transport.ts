import { TransportError } from './errors';

export interface TransportOptions {
  endpoint: string;
  retries?: number;
  backoffMs?: number;
}

export async function rpcCall<T>(opts: TransportOptions, method: string, params: unknown): Promise<T> {
  const body = JSON.stringify({ jsonrpc: '2.0', id: 1, method, params });
  const res = await fetch(opts.endpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body,
  });
  if (!res.ok) throw new TransportError(`status ${res.status}`, res.status);
  const json = await res.json();
  return json.result as T;
}
