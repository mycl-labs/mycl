export class HyphaError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'HyphaError';
  }
}

export class CompressionError extends HyphaError {
  constructor(message: string) {
    super(message);
    this.name = 'CompressionError';
  }
}

export class ProofError extends HyphaError {
  constructor(message: string) {
    super(message);
    this.name = 'ProofError';
  }
}

export class TransportError extends HyphaError {
  public readonly status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = 'TransportError';
    this.status = status;
  }
}

export class SubscriptionError extends HyphaError {
  constructor(message: string) {
    super(message);
    this.name = 'SubscriptionError';
  }
}
