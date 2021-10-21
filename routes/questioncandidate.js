const router = require("express").Router();
const QuestionContext = require("../models/Question");

router.get("/candidate/:selected", async (req, res) => {
  try {
    const html = await QuestionContext.find({ category: html });
  } catch (err) {
    res.status(500).send(err);
  }
  try {
    const css = await QuestionContext.find({ category: html });
  } catch (err) {
    res.status(500).send(err);
  }
  try {
    const sql = await QuestionContext.find({ category: html });
  } catch (err) {
    res.status(500).send(err);
  }
  try {
    const aptitude = await QuestionContext.find({ category: html });
  } catch (err) {
    res.status(500).send(err);
  }
  try {
    const selectedLanguage = await QuestionContext.find({
      category: req.params.selected,
    });
  } catch (err) {
    res.status(500).send(err);
  }
  try {
    const allQuestions = [
      {
        html: html,
        css: css,
        sql: sql,
        aptitude: aptitude,
        selectedLanguage: selectedLanguage,
      },
    ];

    res.status(200).send(allQuestions);
  } catch (err) {
    res.status(500).send(err);
  }
});
