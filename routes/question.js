const router = require("express").Router();
const QuestionAnswerService = require('../Services/QuestionAnswerService')


router.post('/', async (req, res) => {
  let result = await QuestionAnswerService.CreateQuestionAndOptionsAsync(req.body)
  if (result.IsSuccess) {
    res.status(201).send({
      message: "Created SuccessFully",
      CreatedAt: `/api/questions/${result.Qid}`
    })
  } else {
    res.status(500).send(result)
  }
})

router.get('/search/:category', async (req, res) => {

  let result = await QuestionAnswerService.GetQuestionAndOptionByCategoryAsync(req.params.category)
  if (result.IsSuccess) {
    res.status(200).send(result.Questions)
  }
  else{
    res.status(500).send(result)
  }
 })


 router.get('/search/Shuffled/:category', async (req, res) => {

  let result = await QuestionAnswerService.GetQuestionAndOptionByCategoryShuffledAsync(req.params.category)
  if (result.IsSuccess) {
    res.status(200).send(result.Questions)
  }
  else{
    res.status(500).send(result)
  }
 })

router.get('/:Qid',async(req , res) =>{

  let result = await QuestionAnswerService.GetQuestionAndOptionByIdAsync(req.params.Qid)
  if(!result.IsSuccess){
    if(result.Status == 404)
      res.status(404).send(result.Error)
    else if(result.Status == 500)
      res.status(500).send(result.Error)
  }else{
    let tempObj = {
      Question : result.Question,
      Options : result.Options
    }
    res.status(200).send(tempObj)
  }
})

router.delete('/:Qid', async (req, res) => {
  let result = await QuestionAnswerService.DeleteQuestionAsync(req.params.Qid)
  if (result.IsSuccess) {
    res.status(200).send()
  }
  else{
    res.status(500).send()
  }
})

//Patch

router.patch('/title/:Qid',async(req,res) =>{

  let result = await QuestionAnswerService.UpdateQuestionTitleAsync(req.params.Qid,req.body)
  if(!result.IsSuccess){
    if(result.Status){
      if(result.Status == 404) res.status(404).send(result.Errors)
      else{
        res.status(500).send(result.Errors)
      }
    }
    else{
      res.status(500).send(result.Errors)
    }
  }else{
    res.status(200).send()
  }
})

router.patch('/correct/:Qid',async(req,res) =>{

  let result = await QuestionAnswerService.UpdateCorrectOptionFromRequestAsync(req.params.Qid,req.body)
  if(!result.IsSuccess){
    if(result.Status){
      if(result.Status == 404) res.status(404).send(result.Errors)
      else{
        res.status(500).send(result.Errors)
      }
    }
    else{
      res.status(500).send(result.Errors)
    }
  }else{
    res.status(200).send()
  }
})

router.patch('/option/:Oid',async(req,res) =>{

  let result = await QuestionAnswerService.UpdateOptionAsync(req.params.Oid,req.body)
  if(!result.IsSuccess){
    if(result.Status){
      if(result.Status == 404) res.status(404).send(result.Errors)
      else{
        res.status(500).send(result.Errors)
      }
    }
    else{
      res.status(500).send(result.Errors)
    }
  }else{
    res.status(200).send()
  }
})


module.exports = router;
