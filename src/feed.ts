import { FeedBatch, FeedMetadata, FeedSample, FeedBatchSchema } from './schema';
import { buildRoot, hashLeaf } from './utils/merkle';
import { bytesToHex } from './utils/bytes';

export class Feed {
  public readonly meta: FeedMetadata;
  public readonly samples: FeedSample[];

  constructor(meta: FeedMetadata, samples: FeedSample[] = []) {
    this.meta = meta;
    this.samples = [...samples];
  }

  append(sample: FeedSample): this {
    this.samples.push(sample);
    return this;
  }

  latest(n: number = 10): FeedSample[] {
    return this.samples.slice(-n);
  }

  encodeBatch(): FeedBatch {
    const leaves = this.samples.map((s) => Buffer.from(JSON.stringify(s)));
    const root = bytesToHex(buildRoot(leaves.map((b) => new Uint8Array(b))));
    const batch: FeedBatch = {
      feed: this.meta.slug,
      samples: [...this.samples],
      root,
    };
    return FeedBatchSchema.parse(batch);
  }

  isEmpty(): boolean { return this.samples.length === 0; }

  reset(): void { this.samples.length = 0; }

  stats() {
    if (this.isEmpty()) return { min: 0, max: 0, mean: 0, count: 0 };
    let min = Infinity;
    let max = -Infinity;
    let sum = 0;
    for (const s of this.samples) {
      if (s.value < min) min = s.value;
      if (s.value > max) max = s.value;
      sum += s.value;
    }
    return { min, max, mean: sum / this.samples.length, count: this.samples.length };
  }
}

export { hashLeaf };
