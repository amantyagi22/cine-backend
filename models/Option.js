const mongoose = require("mongoose");
const OptionSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  QuestionId: {
    type: String,
  },
});
module.exports = mongoose.model("Option", OptionSchema);
