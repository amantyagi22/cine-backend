const router = require("express").Router();
const Question = require("../models/Question");

router.get("/", async (req, res) => {
  const problem = await new Question({
    category: req.body.category,
  });
  await problem.save();
  res.send("Question added in database");
});

module.exports = router;
