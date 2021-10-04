const mongoose = require("mongoose");
const OptionSchema = new mongoose.Schema({});
module.exports = mongoose.model("Option", OptionSchema);
