import { FeedMetadata, FeedSample } from './schema';

export class Feed {
  public readonly meta: FeedMetadata;
  public readonly samples: FeedSample[];
  constructor(meta: FeedMetadata, samples: FeedSample[] = []) {
    this.meta = meta;
    this.samples = samples;
  }
}
