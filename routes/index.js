const router = require("express").Router();
const { ERROR_404 } = require("../utils/errors");
const clothingItem = require("./clothingItem");
const user = require("./users");
const like = require("./likes");
const { createUser, login } = require("../controllers/users");

router.use("/items", clothingItem);

router.use("/users", user);

router.use("/items", like);

router.post("/signin", login);
router.post("/signup", createUser);

router.use((req, res) => {
  res.status(ERROR_404).send({ message: "Router Not Found" });
});
module.exports = router;
