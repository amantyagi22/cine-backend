const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/*
    STATE ID
    1 FOR ANSWERED AND IF IT IS ANSWERED THEN SELECTED OPTION WILL NOT BE NULL
    2 FOR NOT ANSWERED
    3 FOR MARKED REVIEW

*/


const AnsweredQuestionsModel =  new mongoose.Schema({
    QuestionId: {
      type: Schema.Types.ObjectId,
      ref: "Question",
    },
    UserId : {
        type : Schema.Types.ObjectId,
        ref : "Candidate"
    },
    StateId :{
        type : Number,
        default : 2
    },
    SelectedOption : {
        type : Schema.Types.ObjectId,
        ref : "Option",
        default : null
    }
  });

  module.exports = mongoose.model("UserAnswers", AnsweredQuestionsModel);