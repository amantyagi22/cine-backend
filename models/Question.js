const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new mongoose.Schema({
  category: {
    type: String,
  },
  title: {
    type: String,
  },
  IsCorrectOption: {
    type: String,
    ref: "Option",
  },
});
module.exports = mongoose.model("Question", QuestionSchema);


// {
//   "category": "html",
//   "title" : "jai hind sir",
//   "IsCorrectOption" :  "yes"
// }