const {
  ERROR_400,
  ERROR_401,
  ERROR_403,
  ERROR_404,
  ERROR_409,
  ERROR_500,
} = require("./errors");

const handleErrors = (req, res, err) => {
  if (err.name === "ValidationError" || err.name === "CastError") {
    return res.status(ERROR_400).send({ message: "invalid user" });
  }
  if (err.name === "NotFoundError") {
    return res.status(ERROR_404).send({ message: "not found" });
  }
  if (err.name === "DocumentNotFoundError" || err.name === "IdNotFoundError") {
    return res.status(ERROR_404).send({ message: "ID not found" });
  }
  if (err.name === "DuplicateError") {
    return res.status(ERROR_409).send({ message: "email already exists" });
  }
  if (err.message === "incorrect email or password") {
    return res
      .status(ERROR_401)
      .send({ message: "incorrect email or password" });
  }
  if (err.message === "item cannot be deleted") {
    return res.status(ERROR_403).send({ message: "Item cannot be deleted" });
  }
  return res.status(ERROR_500).send({ message: "Server Error" });
};

module.exports = {
  handleErrors,
};
