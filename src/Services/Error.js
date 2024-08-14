class ErrorService extends Error {
  constructor(message = "", body = {}) {
    super(message);
    this.body = body;
  }
}

export { ErrorService };
