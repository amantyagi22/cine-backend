const CrudService =  require('../BaseService/CrudServices')
const QuestionContext = require('../models/Question')
const OptionContext = require('../models/Option')
const _QuestionCrudService = CrudService(QuestionContext)
const _OptionCrudService = CrudService(OptionContext)

class QuestionAnswerService{


    //Get Operations

    GetQuestionByIdAsync = async(_id) =>{
        return await _QuestionCrudService.GetbyIdAsync(_id)
    }

    GetQuestionsByCategoryAsync = async(Category) =>{

        return await QuestionContext.find({category:Category}) 
    }

    GetOptionsByQuestionIdAsync = async(QId) =>{
        //QId is question Id
        return await OptionContext.find({QuestionId:QId}) 

    }

    GetQuestionAndOptionByIdAsync = async(Qid) =>{
        try {
            let QuestionResult = await this.GetQuestionByIdAsync(Qid)
            let OptionResult = await this.GetOptionsByQuestionIdAsync(Qid)
            if( (QuestionResult == null) || (OptionResult == null) ){
                return {IsSuccess : false , Error : "Question not found"}
            }
            return {IsSuccess : true  ,  Question : {
                Title : QuestionResult.title,
                Category : QuestionResult.category
            } , Options : OptionResult}
        } catch (error) {
            return {IsSuccess : false , Error : error}
        }

    }

    GetQuestionAndOptionByCategoryAsync  = async(Category) =>{

        try{
            let QuestionResult = await this.GetQuestionsByCategoryAsync(Category)
            if(QuestionResult == null){
                return {IsSuccess  : false , Error : "Category not found"}
            }
            let QuestionArray = []
            for(let i of QuestionResult){
                let OptionResult = await this.GetOptionsByQuestionIdAsync(i._id)
                QuestionArray.push({
                    Question:{
                        Id : i._id,
                        Title : i.title,
                        Category : i.category
                    },
                    Options:OptionResult
                })
            }
            return {IsSuccess : true  , Questions : QuestionArray}
        }
        catch(error){
            return {IsSuccess : false , Error : error}
        }

    }


    //Create
    CreateQuestionAndOptionsAsync = async(req) =>{

        //Request Format
        /*{

            Question:{
                category : "Aptitude",
                title : "Random"
            },
            Options:[
                {
                    title : "Random",
                    IsCorrect : true or false 
                }
            ]

        }*/
        req.Question.IsCorrectOption = null
        let QuestionCreateResult = await _QuestionCrudService.CreateFromRequestAsync(req.Question)
        if(!QuestionCreateResult.IsSuccess){
            return QuestionCreateResult
        }
        let CreatedQuestion = QuestionCreateResult.Data
        for(let i of req.Options){
            let OptionFormat = {
                title : i.title,
                QuestionId : CreatedQuestion._id
            }
            let OptionCreateResult = await _OptionCrudService.CreateFromRequestAsync(OptionFormat)
            if(!OptionCreateResult.IsSuccess){
                return OptionCreateResult
            }
            if(i.IsCorrect)
            {
               let UpdateResult =  await  this.UpdateCorrectOptionAsync(CreatedQuestion._id , OptionCreateResult.Data._Id)
               if(!UpdateResult.IsSuccess){
                return {IsSuccess : false}
               }
            }

        }
        return {IsSuccess : true}

    }
    
    


    //Update

    UpdateCorrectOptionAsync =  async(Qid , OId) =>{
        //Qid is QuestionId
        //Oid is OptionId
        let QuestionResult = await this.GetQuestionByIdAsync(Qid)
        QuestionResult.IsCorrectOption = OId
        let UpdateResult = await _QuestionCrudService.UpdateByIdAsync(QuestionResult , Qid)
        return UpdateResult
    }

    UpdateQuestionAsync = async(Qid,req) =>{
        let UpdateResult = await _QuestionCrudService.UpdateByIdAsync(req , Qid)
        return UpdateResult
    }

    UpdateOptionAsync = async(Oid,req) =>{
        let UpdateResult = await _OptionCrudService.UpdateByIdAsync(req,Oid)
        return UpdateResult
    }

    //Delete

    DeleteQuestionAsync =  async(Qid) =>{
        let QuestionDeleteResult = await _QuestionCrudService.DeleteByIdAsync(Qid)
        if(!QuestionDeleteResult.IsSuccess){
            return QuestionDeleteResult
        } 
        let OptionsResult = await this.GetOptionsByQuestionIdAsync(Qid)
        for(let i of OptionsResult){
            let OptionDeleteResult = await _OptionCrudService.DeleteByIdAsync(i._id)
            if(!OptionDeleteResult.IsSuccess){
                return OptionDeleteResult
            }
        }
        return  {IsSuccess : true}
    }

}

module.exports = new QuestionAnswerService()