const { JWT_SECRET } = require("../utils/config");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  // let's check the header exists and starts with 'Bearer '
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Authorization required" });
  }

  const token = authorization.replace("Bearer ", "");

  let payload;

  try {
    // trying to verify the token
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    // we return an error if something goes wrong
    return res.status(401).send({ message: "Invalid Token" });
  }

  req.user = payload;

  return next();
};
