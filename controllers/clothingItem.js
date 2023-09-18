const ClothingItem = require("../models/clothingItem");
const handleErrors = require("../utils/handleErrors");

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
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      handleErrors(req, res, err);
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  console.log(itemId);

  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (String(item.owner) !== req.user._id) {
        throw Error("Cannot delete item");
      }

      ClothingItem.findByIdAndDelete(item._id)
        .orFail()
        .then(() => {
          res.status(200).send({ message: "item deleted" });
        })
        .catch((err) => {
          handleErrors(req, res, err);
        });
    })

    .catch((err) => {
      handleErrors(req, res, err);
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
};
