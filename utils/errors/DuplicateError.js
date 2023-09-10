class DuplicateError extends Error {
  constructor(message) {
    super(message);
    this.name = "DuplicateError";
    this.statusCode = 409;
    this.message = "Email aleady exists";
  }
}

module.exports = { DuplicateError };
