const router =require("express").Router();
const Candidate = require("../models/User.js");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// const { registervalidation } = require("../validation.js");

// const {loginvalidation} = require("../validation.js");

// router.post("/signup",function(req,res){

// //validation

// const {error} = registervalidation(req.body);
// if(error){res.status(400).send(error.details[0].message);}
// else{
//        User.findOne({email:req.body.email},function(err,emailExists){

//     if(emailExists){
//       res.send("email already exists please check");

//     }

//     else {

//       const hashPass = Bcrypt.hashSync(req.body.password,10);

//        const user = new User({
//          name:req.body.name,
//          email:req.body.email,
//          password:hashPass
//        });

//        user.save(function(err){
//          if(err){res.status(400).send(err);}
//          else{res.send(user);}
//        })

//     }
//        });
// }
// });



//LOGIN

router.post("/", function (req,res) {

  const email =req.body.email ;
  const password = req.body.password;

  console.log(email);
  console.log(password);

   Candidate.findOne({email: email}).then(user => {
        console.log("before bcrypt");
        console.log(user.password);
     bcrypt.compare(password, user.password) // to compare the stored and entered password, returning because this will give us a promise
     .then(equal=>{  //will get a true or false
       if(!equal){
         return res.json({"response":"password incorrect"})
    }

    //create and assign token


    const token = jwt.sign({_id:user._id}, "secret");
    console.log("after token generation");
    res.header('auth-token',token).json({token:token, userId:user._id.toString() , message:'User logged in', username:user.name})

})
.catch((err) => {
  res.json({"response":"something went wrong"})
 });
}).catch(err => {res.json({"response":"user not found"})})



});
module.exports = router;