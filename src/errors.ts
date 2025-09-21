export class UnparsableWordError extends Error {
  constructor(word: string) {
    super(`Couldn't parse: "${word}"`);
    this.name = "UnparsableWordError";
  }
}
