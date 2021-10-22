const router = require("express").Router();
const Question = require("../models/Question");
const QuestionAnswerService = require("../Services/QuestionAnswerService");

router.post("/", (req, res) => {
  const newQuestion = new Question(req.body);
  try {
    const QuestionResult =
      await QuestionAnswerService.GetQuestionsByCategoryAsync();
    for (let i in QuestionResult) {
    }
  } catch (err) {}
});
