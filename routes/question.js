const router = require("express").Router();
const Question = require("../models/Question");

router.get("/",(req,res)=>{
    res.send("This is question route")
})

module.exports = router;