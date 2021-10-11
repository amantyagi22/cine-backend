const mongoose = require("mongoose");
const OptionSchema = new mongoose.Schema({
  title: [
    {
      type: String,
    },
  ],
});
module.exports = mongoose.model("Option", OptionSchema);
