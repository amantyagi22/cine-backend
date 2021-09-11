const router = require("express").Router();
const Question = require("../models/Question");

router.get("/",async (req,res)=>{
    const question = await new Question({
       description: req.body.description,
       category: req.body.category,
       answer: req.body.answer
    })
    await question.save();
    res.send("Question added in database");
})

module.exports = router;