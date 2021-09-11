const router = require("express").Router();
const Candidate = require("../models/Candidate");

// router.get("/",(req,res)=>{
//     res.send("This is candidate route")
// })

router.get("/",async (req,res)=>{

   const candidate = await new Candidate({
       name:req.body.name,
       studentNumber:req.body.studentNumber,
    rollNumber:req.body.rollNumber,
      email:req.body.email,
      phoneNumber:req.body.phoneNumber,
      branch:req.body.branch,
      residency:req.body.residency,
      attendedExam:req.body.attendedExam,
      isAdmin:req.body.isAdmin
   });

   await candidate.save();
   res.send("Candidate registered");
})

module.exports = router;