const router = require("express").Router();
const Question = require("../models/Question");

router.get("/all/:selectedCategory", async (req, res) => {
  const htmlQuestions = await Question.find({ category: "html" }, "_id");
  const html = htmlQuestions.map((ques) => ques._id);
  const cssQuestions = await Question.find({ category: "css" }, "_id");
  const css = cssQuestions.map((ques) => ques._id);
  const sqlQuestions = await Question.find({ category: "sql" }, "_id");
  const sql = sqlQuestions.map((ques) => ques._id);
  const aptitudeQuestions = await Question.find(
    { category: "aptitude" },
    "_id"
  );
  const aptitude = aptitudeQuestions.map((ques) => ques._id);
  const selectedLanguage = await Question.find(
    { category: req.params.selectedCategory },
    "_id"
  );
  const language = selectedLanguage.map((ques) => ques._id);
  try {
    let allQuestions = [
      {
        html: html,
        css: css,
        sql: sql,
        aptitude: aptitude,
        category: language,
      },
    ];
    res.status(200).send(allQuestions);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
