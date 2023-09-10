const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { ValidationError } = require("../utils/errors/ValidationError");
const { NotFoundError } = require("../utils/errors/NotFoundError");
const { CastError } = require("../utils/errors/CastError");
const { ServerError } = require("../utils/errors/ServerError");
const { DuplicateError } = require("../utils/errors/DuplicateError");
const { JWT_SECRET } = require("../utils/config");

// get Users
// const getUsers = (req, res) => {
//   User.find({})
//     .then((users) => res.status(200).send(users))
//     .catch((e) => {
//       console.log(e);
//       const serverError = new ServerError();
//       return res
//         .status(serverError.statusCode)
//         .send({ message: "Server Error" });
//     });
// };

// get User
// const getUser = (req, res) => {
//   const { userId } = req.params;

//   User.findById(userId)
//     .orFail(() => new NotFoundError())
//     .then((user) => res.status(200).send({ data: user }))
//     .catch((e) => {
//       console.log(e);
//       if (e.name && e.name === "CastError") {
//         const castError = new CastError();
//         return res.status(castError.statusCode).send({ message: "Cast Error" });
//       }
//       if (e.name && e.name === "NotFoundError") {
//         console.log("throwing a NotFoundError");
//         const notFoundError = new NotFoundError();
//         return res
//           .status(notFoundError.statusCode)
//           .send({ message: "Not Found" });
//       }
//       const serverError = new ServerError();
//       return res
//         .status(serverError.statusCode)
//         .send({ message: "Server Error" });
//     });
// };

// create User
const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;
  User.findOne({ email }).then((emailFound) => {
    if (emailFound) {
      res
        .status(400)
        .send({ message: "User already exists" });
    } else {
      bcrypt
        .hash(password, 10)
        .then((hash) => User.create({ name, avatar, email, password: hash }))
        .then((user) => {
          res.send({ name, avatar, email, _id: user._id });
        })
        .catch((e) => {
          if (e.name && e.name === "ValidationError") {
            console.log(ValidationError);
            const validationError = new ValidationError();
            return res
              .status(validationError.statusCode)
              .send({ message: validationError.message });
          }
          const serverError = new ServerError();
          return res
            .status(serverError.statusCode)
            .send({ message: serverError.message });
        });
    }
  });
};

//login

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((e) => {
      if (e.name && e.name === "ValidationError") {
        console.log(ValidationError);
        const validationError = new ValidationError();
        return res
          .status(validationError.statusCode)
          .send({ message: validationError.message });
      }
      const serverError = new ServerError();
      return res
        .status(serverError.statusCode)
        .send({ message: serverError.message });
    });
};

const getCurrentUser = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(() => new NotFoundError())
    .then((user) => res.status(200).send({ data: user }))
    .catch((e) => {
      console.log(e);
      if (e.name && e.name === "CastError") {
        const castError = new CastError();
        return res.status(castError.statusCode).send({ message: "Cast Error" });
      }
      if (e.name && e.name === "NotFoundError") {
        const notFoundError = new NotFoundError();
        return res
          .status(notFoundError.statusCode)
          .send({ message: "Not Found" });
      }
      const serverError = new ServerError();
      return res
        .status(serverError.statusCode)
        .send({ message: "Server Error" });
    });
};

const updateCurrentUser = (req, res) => {
  const { name, avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.status(200).send({ data: user }))
    .catch((e) => {
      console.log(e);
      if (e.name && e.name === "CastError") {
        const castError = new CastError();
        return res.status(castError.statusCode).send({ message: "Cast Error" });
      }
      if (e.name && e.name === "NotFoundError") {
        const notFoundError = new NotFoundError();
        return res
          .status(notFoundError.statusCode)
          .send({ message: "Not Found" });
      }
      const serverError = new ServerError();
      return res
        .status(serverError.statusCode)
        .send({ message: "Server Error" });
    });
};

module.exports = {
  createUser,
  getCurrentUser,
  updateCurrentUser,
  login,
};
