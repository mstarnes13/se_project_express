const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const { handleErrors } = require("../utils/handleErrors");
const { ERROR_409 } = require("../utils/errors");
const { ERROR_404 } = require("../utils/errors");

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  User.findOne({ email })
    .then((emailFound) => {
      if (emailFound) {
        res.status(ERROR_409).send({ message: "User already exists" });
      } else {
        bcrypt
          .hash(password, 10)
          .then((hash) => User.create({ name, avatar, email, password: hash }))
          .then((user) => {
            res.send({ name, avatar, email, _id: user._id });
          })
          .catch((err) => {
            console.error(err, "console error for createUser");
            handleErrors(req, res, err);
          });
      }
    })
    .catch((err) => {
      console.error(err);
      handleError(req, res, err);
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      console.error(err);
      handleErrors(req, res, err);
    });
};

const getCurrentUser = (req, res) => {
  const { _id: userId } = req.user;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(ERROR_404).send({ message: "User not found" });
      }
      return res.send(user);
    })
    .catch((err) => {
      handleErrors(req, res, err);
    });
};

const updateCurrentUser = (req, res) => {
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      console.error(err);
      handleErrors(req, res, err);
    });
};

module.exports = {
  createUser,
  getCurrentUser,
  updateCurrentUser,
  login,
};
