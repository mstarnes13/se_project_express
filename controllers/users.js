const User = require("../models/user");
const { ValidationError } = require("../utils/ValidationError");
const { NotFoundError } = require("../utils/NotFoundError");
const { CastError } = require("../utils/CastError");
const { ServerError } = require("../utils/ServerError");

// get Users
const getUsers = (req, res) => {
  console.log(req);
  User.find({})
    .then((items) => res.status(200).send(items))
    .catch((e) => {
      console.log(e);
      const serverError = new ServerError();
      return res.status(serverError.statusCode).send({message: "Server Error"});
    });
};

// get User
const getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(() => new NotFoundError())
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      console.log(e);
      if (e.name && e.name === "CastError") {
        const castError = new CastError();
        return res.status(castError.statusCode).send({message: "Cast Error"});
      }
      if (e.name && e.name === "NotFoundError") {
        console.log("throwing a NotFoundError");
        const notFoundError = new NotFoundError();
        return res.status(notFoundError.statusCode).send({message: "Not Found"});
      }
      const serverError = new ServerError();
      return res.status(serverError.statusCode).send({message: "Server Error"});
    });
};

// create User
const createUser = (req, res) => {
  console.log(req);
  console.log(req.body);

  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((item) => {
      console.log(item);
      res.send({ data: item });
    })
    .catch((e) => {
      if (e.name && e.name === "ValidationError") {
        console.log(ValidationError);
        const validationError = new ValidationError();
        return res
          .status(validationError.statusCode)
          .send(validationError.message);
      }
      const serverError = new ServerError();
      return res.status(serverError.statusCode).send({message: "Server Error"});
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
};
