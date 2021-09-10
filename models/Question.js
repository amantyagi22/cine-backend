const mongoose = require("mongoose");
const QuestionSchema = new mongoose.Schema({
    question:{
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