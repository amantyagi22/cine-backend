const mongoose = require("mongoose");
const OptionSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  QuestionId: {
    type: Schema.Types.ObjectId,
    ref: "Question",
  },
});
module.exports = mongoose.model("Option", OptionSchema);
