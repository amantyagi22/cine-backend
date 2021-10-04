const mongoose = require("mongoose");
const QuestionSchema = new mongoose.Schema({
  category: {
    type: String,
  },
  title: {
    type: String,
  },
  option: {
    type: Array,
  },
});
module.exports = mongoose.model("Question", QuestionSchema);
