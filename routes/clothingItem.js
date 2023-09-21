const router = require("express").Router();
const auth = require("../middlewares/auth");

const {
  createItem,
  getItems,
  deleteItem,
} = require("../controllers/clothingItem");

router.post("/", auth, createItem);

router.get("/", getItems);

router.delete("/:itemId", auth, deleteItem);

module.exports = router;
