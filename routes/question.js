const router = require("express").Router();
const QuestionAnswerService = require('../Services/QuestionAnswerService')


router.post('/', async(req,res) =>{
  let result = await QuestionAnswerService.CreateQuestionAndOptionsAsync(req)
  if(result.IsSuccess){
    res.status(201).send({
      message : "Created SuccessFully",
      CreatedAt : `/api/questions/${result.Qid}`
    })
  }else{
    res.status(500).send(result)
  }
} )

router.get('/search/:category' , async(req,res) =>{

  let result = await QuestionAnswerService.GetQuestionAndOptionByCategoryAsync(req.params.category)
  if(result.IsSuccess){
    res.status(200).send(result.Questions)
  }
  res.status(500).send(result)
})

router.delete('/:Qid' , async(req,res) =>{
  let result = await QuestionAnswerService.DeleteQuestionAsync(req.params.Qid)
  if(result.IsSuccess){
    res.status(200).send()
  }
  res.status(500).send()
})


module.exports = router;
