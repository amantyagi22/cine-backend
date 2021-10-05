const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  category: {
    type: String,
  },
  title: {
    type: String,
  },
  option: {
    type: Schema.Types.ObjectId,
    ref: "Option",
  },
});
module.exports = mongoose.model("Question", QuestionSchema);
