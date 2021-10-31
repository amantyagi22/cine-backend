const TokenService = require("../Services/TokenServices")

const AuthJwt = async(req,res,next) =>{
    let result =  await TokenService.VerifyTokenAndGetId(req)
    if(result.IsSuccess){
        //console.log(result)
        next()
    }
    else{
     console.log(result.error)
     res.status(401).send({
         message : "Jwt is not valid or user doesn't exist",
         error : result.Error 
     })
    }
 }
 
 module.exports =  AuthJwt