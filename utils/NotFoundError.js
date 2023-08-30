class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
    this.message = "Not Found";
  }
}

module.exports = { NotFoundError };
