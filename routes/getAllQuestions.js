const router = require("express").Router();
const Question = require("../models/Question");
const User = require("../models/User");

router.get("/candidate/question", async (req, res) => {
  const htmlQuestions = Question.findOne(
    { category: "html" },
    "_id",
    (err, html) => {
      if (err) return handleError(err);
    }
  );
  const cssQuestions = Question.findOne(
    { category: "css" },
    "_id",
    (err, css) => {
      if (err) return handleError(err);
    }
  );
  const sqlQuestions = Question.findOne(
    { category: "sql" },
    "_id",
    (err, sql) => {
      if (err) return handleError(err);
    }
  );
  const aptitudeQuestions = Question.findOne(
    { category: "aptitude" },
    "_id",
    (err, aptitude) => {
      if (err) return handleError(err);
    }
  );
  const selectedLanguage = Question.findOne(
    { category: User.categorySelected },
    "_id",
    (err, selectedLanguage) => {
      if (err) return handleError(err);
    }
  );
  try {
    let allQuestions = [
      {
        html: htmlQuestions,
        css: cssQuestions,
        sql: sqlQuestions,
        aptitude: aptitudeQuestions,
      },
    ];
    allQuestions[User.categorySelected] = selectedLanguage;
    res.status(200).send(allQuestions);
  } catch (err) {
    res.status(500).send(err);
  }
});
