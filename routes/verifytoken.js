const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Acess denied");

  jwt.verify(token, "secret", (err, verified) => {
    if (err) {
      res.status(400).send("invalid token");
    } else {
      req.userId = verified.id;
      next();
    }
  });
};
