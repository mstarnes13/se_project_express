const ClothingItem = require("../models/clothingItem");
const { handleErrors } = require("../utils/handleErrors");
const { ERROR_403 } = require("../utils/errors");

const createItem = (req, res) => {
  console.log(req.body);

  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      console.log(item);
      console.log(req.user._id);
      res.send({ data: item });
    })
    .catch((err) => {
      handleErrors(req, res, err);
    });
};

const getItems = (req, res) => {
  console.log(req);
  ClothingItem.find({})
    .then((items) => {
      res.send({ data: items });
    })
    .catch((err) => {
      console.error(err);
      handleErrors(req, res, err);
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  console.log(itemId);

  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      const itemOwner = item.owner.toString();

      if (req.user._id !== itemOwner) {
        res.status(ERROR_403).send({ message: "Item cannot be deleted" });
      } else {
        ClothingItem.findByIdAndDelete(itemId)
          .orFail()
          .then((itemRes) => {
            res.send({ data: itemRes });
          })
          .catch((err) => {
            console.error(err);
            handleErrors(req, res, err);
          });
      }
    })

    .catch((err) => {
      console.error(err);
      handleErrors(req, res, err);
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
};
