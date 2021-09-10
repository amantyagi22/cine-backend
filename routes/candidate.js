const router = require("express").Router();
const Candidate = require("../models/Candidate");

router.get("/",(req,res)=>{
    res.send("This is candidate route")
})

module.exports = router;