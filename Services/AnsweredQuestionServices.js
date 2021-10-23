const CrudService = require("../BaseService/CrudServices");
const QuestionContext = require("../models/Question");
const OptionContext = require("../models/Option");
const UserAnswerContext = require("../models/UserAnswers")
const _QuestionCrudService = new CrudService(QuestionContext);
const _OptionCrudService = new CrudService(OptionContext);
const _UserAnswerCrudService = new CrudService(UserAnswerContext)

class AnsweredQuestionService {


    getAllAnsweredQuestionsByUserId = async(Uid) =>{
        return await UserAnswerContext.find({
            UserId : Uid
        })
    }


    CreateAndUpdateAnsweredQuestionAsync = async(Uid , QuestionId ,Status ,OptionId) =>{

        try {
                
            let result = await UserAnswerContext.findOne({
                QuestionId : QuestionId,
                UserId : Uid
            })
    
            if(result !=  null){
                //Update the Answered Status , and OptionId if neccessary
                let AnsweredUpdateResult = await this.UpdateAnsweredQuestionAsync(result._id ,Status,OptionId)
                if(!AnsweredUpdateResult.IsSuccess){
                    return AnsweredUpdateResult
                }
                else{
                    return {
                        IsSuccess : true,
                        AnsweredQuestionId : result._id
                    }
                }
            }else{
                //Create a new Answered Question
                let CreateAnsweredQuestionResult = await this.CreateAnsweredQuestionAsync(Uid,QuestionId,Status,OptionId)
                if(CreateAnsweredQuestionResult == null)
                {
                    return {IsSuccess : false , Error : "Create Failed"}
                }
                else{
                    return {IsSuccess : true ,AnsweredQuestionId : CreateAnsweredQuestionResult }
                }
            }
        } catch (error) {
            return {IsSuccess : false , Status : 500 , Error : error}
        }
    
    }


    CreateAnsweredQuestionAsync = async(Uid , QuestionId ,Status ,OptionId) =>{

        let request = {
            QuestionId ,
            UserId : Uid ,
            StateId : Status
        }

        switch (Status) {
            case 2:
                request.SelectedOption =null;
                break;
            case 1 :
                request.SelectedOption = OptionId;
                break;
            case 3 :
                request.SelectedOption = OptionId;
                break;
            default:
                return {IsSuccess : false , Status : 400 , Error : "Status Code not defined"};
        }

        let CreateResult = await _UserAnswerCrudService.CreateFromRequestAsync(request)

        if(CreateResult.IsSuccess){
                return CreateResult.Data._id
        }else{
            console.log(CreateResult.Error)
            return null
        }

    }


    UpdateAnsweredQuestionAsync = async(Id,Status,OptionId) =>{
        try {
            let AnsweredQuestionResult = await _UserAnswerCrudService.GetbyIdAsync(Id)
            //Status Check
            AnsweredQuestionResult.StateId = Status;
            switch (Status) {
                case 2:
                    AnsweredQuestionResult.SelectedOption =null;
                    break;
                case 1 :
                    AnsweredQuestionResult.SelectedOption = OptionId;
                    break;
                case 3 :
                    AnsweredQuestionResult.SelectedOption = OptionId;
                    break;
                default:
                    return {IsSuccess : false , Status : 400 , Error : "Status Code not defined"};
            }
            let UpdateResult = await _UserAnswerCrudService.UpdateByIdAsync(AnsweredQuestionResult,Id)
            return UpdateResult

        } catch (error) {
            return {IsSuccess : false  , Status : 500 , Error : error}
        }
    
    }





}


module.exports = new AnsweredQuestionService();
