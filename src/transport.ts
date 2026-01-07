import { TransportError } from './errors';
import { DEFAULT_RETRY_BACKOFF_MS, DEFAULT_RETRY_MAX } from './constants';

export interface TransportOptions {
  endpoint: string;
  retries?: number;
  backoffMs?: number;
  timeoutMs?: number;
  fetchImpl?: typeof fetch;
}

export async function rpcCall<T>(opts: TransportOptions, method: string, params: unknown): Promise<T> {
  const retries = opts.retries ?? DEFAULT_RETRY_MAX;
  const backoff = opts.backoffMs ?? DEFAULT_RETRY_BACKOFF_MS;
  const timeout = opts.timeoutMs ?? 15000;
  const fetcher = opts.fetchImpl ?? fetch;
  let lastErr: unknown;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), timeout);
      const res = await fetcher(opts.endpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ jsonrpc: '2.0', id: attempt + 1, method, params }),
        signal: ctrl.signal,
      });
      clearTimeout(timer);
      if (!res.ok) throw new TransportError(`rpc ${method} status ${res.status}`, res.status);
      const json = await res.json() as { result?: T; error?: { message: string } };
      if (json.error) throw new TransportError(json.error.message);
      return json.result as T;
    } catch (err) {
      lastErr = err;
      if (attempt === retries) break;
      await new Promise((r) => setTimeout(r, backoff * Math.pow(2, attempt)));
    }
  }
  throw lastErr instanceof Error ? lastErr : new TransportError('rpc failed');
}
