const router = require("express").Router();
const { ERROR_404 } = require("../utils/errors");
const clothingItem = require("./clothingItem");
const user = require("./users");
const like = require("./likes");

router.use("/items", clothingItem);

router.use("/users", user);

router.use("/items", like);

router.use((req, res) => {
  res.status(ERROR_404).send({ message: "Not Found" });
});
module.exports = router;
