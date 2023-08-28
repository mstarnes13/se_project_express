class CastError extends Error {
  constructor(message) {
    super(message);
    this.name = "CastError";
    this.statusCode = 400;
    this.message = "Cast Error";
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
    this.message = "Not Found";
  }
}

class ServerError extends Error {
  constructor(message) {
    super(message);
    this.name = "ServerError";
    this.statusCode = 500;
    this.message = "Server Error";
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
    this.statusCode = 400;
    this.message = "Validation Error";
  }
}

module.exports = { ValidationError, ServerError, NotFoundError, CastError };
