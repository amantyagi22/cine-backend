const router = require("express").Router();
const User = require("../models/User");

router.get("/all", async (req, res) => {
  const candidates = await User.find();
  const candidatesArray = candidates.map((candidate) => candidate._id);
  try {
    res.status(200).send(candidatesArray);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
