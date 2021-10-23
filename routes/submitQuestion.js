const router = require("express").Router();
const AnswerQuestionService = require("../Services/AnsweredQuestionServices") 

router.post("/" , async(req,res) =>{

 let CreateResult = await AnswerQuestionService.CreateAndUpdateAnsweredQuestionAsync(req.body.Uid,req.body.QuestionId,
  req.body.Status,req.body.OptionId)
  if(CreateResult.IsSuccess){
    res.status(200).send()
  }
  else{
    res.status(500).send(CreateResult)
  }

})


module.exports = router;