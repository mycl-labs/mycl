import { FeedMetadata, FeedSample } from './schema';

export type SampleHandler = (sample: FeedSample) => void;

interface Subscription {
  meta: FeedMetadata;
  handlers: Set<SampleHandler>;
  since: number;
}

export class SubscriptionManager {
  private readonly active = new Map<string, Subscription>();

  subscribe(meta: FeedMetadata, handler: SampleHandler): () => void {
    const existing = this.active.get(meta.slug);
    if (existing) {
      existing.handlers.add(handler);
    } else {
      this.active.set(meta.slug, { meta, handlers: new Set([handler]), since: Date.now() });
    }
    return () => this.unsubscribe(meta.slug, handler);
  }

  unsubscribe(slug: string, handler?: SampleHandler): void {
    const sub = this.active.get(slug);
    if (!sub) return;
    if (handler) sub.handlers.delete(handler);
    if (!handler || sub.handlers.size === 0) this.active.delete(slug);
  }

  deliver(slug: string, sample: FeedSample): number {
    const sub = this.active.get(slug);
    if (!sub) return 0;
    let n = 0;
    for (const h of sub.handlers) { h(sample); n++; }
    return n;
  }

  list(): FeedMetadata[] {
    return [...this.active.values()].map((s) => s.meta);
  }

  size(): number {
    return this.active.size;
  }
}
