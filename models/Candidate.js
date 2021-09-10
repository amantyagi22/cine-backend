const mongoose = require("mongoose")
const CandidateSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    studentNumber:{
        type: Number,
        required: true
    },
    rollNumber:{
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    branch:{
        type: String,
        required: true
    },
    residency:{
        type: String,
        required: true
    },
    attendedExam:{
        type: Boolean,
        default: false
    },
    isAdmin:{
        type: Boolean,
        default: false
    }
})
module.exports = mongoose.model("Candidate",CandidateSchema);