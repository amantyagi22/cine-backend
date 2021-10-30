const CrudService = require("../BaseService/CrudServices");
const UserContext = require("../models/User")
const TokenService = require('./TokenServices')
const bcrypt = require('bcrypt');
const _UserCrudService = new CrudService(UserContext)

class UserService {

    CreateUserAsync = async(req) =>{

        //Pass format
        // FOR ALL ADMINS : ADMIN@CSI
        // FOR ALL CANDIDATES : <Registered Candidate name>@<Registered Student Number>
        if(req.isAdmin){
            //Change the format as required
            req.password = await this._EncryptPassword("ADMIN@CSI")
        }
        else{

            //Change the format as required
            req.password = await this._EncryptPassword(`${req.name}@${req.studentNumber}`)
        }
        let result = await  _UserCrudService.CreateFromRequestAsync(req)
        if(result.IsSuccess){
            let CreatedUser = result.Data
            /*console.log(CreatedUser)
            console.log(CreatedUser._id)*/
            let token  = await this._GenrateJwtToken(CreatedUser._id)
            let role = CreatedUser.isAdmin ? "Admin" : "User"
            return {IsSuccess : true , Token : token , Role : role }
        }else{
            return result
        }
    }

    LoginUserAsync = async(req) =>{

        let StudentId = req.StudentId
        let Password = req.Password

        try{
            let User = await UserContext.findOne({studentNumber : StudentId})
            if(User != null){
                const PasswordAuthResponse = await bcrypt.compare(Password,User.password)
                console.log(PasswordAuthResponse)
                if(PasswordAuthResponse){
                    let token = await this._GenrateJwtToken(User._id)
                    return {
                        IsSuccess : true ,
                        Token : token
                    }
                }
                else{
                    return {
                        IsSuccess : false ,
                        Status : 401 ,
                        Error : "Student id or password is wrong"
                    }
                }
            }else{
                return {IsSuccess : false , Status : 401 , Error : "User not found"}
            }
        }catch(err){

            return { IsSuccess : false , Status : 500 , Error : err }
        }

    }

    _GenrateJwtToken = async (Id) =>{

        let token  = await TokenService.SignToken(Id)
        return token
    }

    _EncryptPassword = async(Password) =>{

        let hashedPass = await bcrypt.hash(Password,8)

        return hashedPass

    }

}

module.exports = new UserService();