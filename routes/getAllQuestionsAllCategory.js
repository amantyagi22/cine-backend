const router = require("express").Router();
const Question = require("../models/Question");

router.get("/all", async (req, res) => {
  const questions = await Question.find();
  const questionsArray = questions.map((question) => question._id);
  try {
    res.status(200).send(questionsArray);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
