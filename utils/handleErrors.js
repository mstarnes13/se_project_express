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
    return res.status(ERROR_400).send({ message: "invalid data" });
  }
  if (err.name === "DocumentNotFoundError" || err.name === "IdNotFoundError") {
    return res.status(ERROR_404).send({ message: "ID not found" });
  }
  if (err.message === "Incorrect password or emial") {
    return res
      .status(ERROR_401)
      .send({ message: "Incorrect password or email" });
  }
  return res.status(ERROR_500).send({ message: "Server Error" });
};

module.exports = {
  handleErrors,
};
