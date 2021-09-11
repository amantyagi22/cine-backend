const mongoose = require("mongoose");
const QuestionSchema = new mongoose.Schema({
    description:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    answer:{
        type: Array,
        default:[]
    }
})
module.exports = mongoose.model("Question",QuestionSchema);