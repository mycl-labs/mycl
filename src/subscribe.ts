import { FeedMetadata } from './schema';

export class SubscriptionManager {
  private readonly active = new Map<string, FeedMetadata>();

  add(meta: FeedMetadata): void {
    this.active.set(meta.slug, meta);
  }

  list(): FeedMetadata[] {
    return [...this.active.values()];
  }
}
