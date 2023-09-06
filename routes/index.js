const router = require("express").Router();
const { NotFoundError } = require("../utils/NotFoundError");
const clothingItem = require("./clothingItem");
const user = require("./users");
const like = require("./likes");

router.use("/items", clothingItem);

router.use("/users", user);

router.use("/items", like);

router.post("/signin", login);

router.post ("/signup", createUser);

router.use((req, res) => {
  const notFoundError = new NotFoundError();
  return res
    .status(notFoundError.statusCode)
    .send({ message: notFoundError.message });
});
module.exports = router;
