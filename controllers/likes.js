const ClothingItem = require("../models/clothingItem");
const { NotFoundError } = require("../utils/errors/NotFoundError");
const { CastError } = require("../utils/errors/CastError");
const { ServerError } = require("../utils/errors/ServerError");

module.exports.likeItem = (req, res) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new NotFoundError())
    .then((items) => res.status(200).send(items))
    .catch((e) => {
      console.log(e);
      if (e.name && e.name === "CastError") {
        const castError = new CastError();
        return res
          .status(castError.statusCode)
          .send({ message: castError.message });
      }

      if (e.name && e.name === "NotFoundError") {
        const notFoundError = new NotFoundError();
        return res
          .status(notFoundError.statusCode)
          .send({ message: notFoundError.message });
      }
      const serverError = new ServerError();
      return res
        .status(serverError.statusCode)
        .send({ message: serverError.message });
    });

module.exports.dislikeItem = (req, res) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new NotFoundError())
    .then((items) => res.status(200).send(items))
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
