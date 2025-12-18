export class HyphaError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'HyphaError';
  }
}
