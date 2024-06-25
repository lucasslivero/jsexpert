export class NotImplementedException extends Error {
  constructor(message) {
    super(`${message} as called without an Implementation`);

    this.name = "NotImplementedException";
  }
}
