
class CRUDBase {

    constructor(DbContext){
        this._DbContext = DbContext
    }

    //Create
    CreateFromRequestAsync = async (req) =>{
        let Req = this._DbContext(req)
        try {
            let result = await Req.save();
            console.log(result)
            return {IsSuccess : true,Data : result}
        } catch (error) {
            console.log(error)
            return {IsSuccess : false , Error : error}
        }
    }

    //Read

    GetAllAsync =  async () =>{
        return await this._DbContext.find()
    }

    GetbyIdAsync = async (_id) =>{
            return await this._DbContext.findById(_id)
    }

    //Update
    UpdateByIdAsync = async(req,id) =>{
        try {
            let obj = await this.GetbyIdAsync(id)
            console.log(obj)
            if(obj != null)
            {
                console.log("here")
                await this._DbContext.findByIdAndUpdate(id,{
                  $set : req
                })
                return {IsSuccess : true}
            }
            else{
                return {IsSuccess : false,Errors:"not found"}
            }
        } catch (error) {
            return {isSuccess : false,Errors : error}
        }
    }

    //Delete

    DeleteByIdAsync = async(_id) =>{
        try {
            let obj = await this.GetbyIdAsync(_id)
            console.log(obj)
            if(obj != null){
                    let result = await this._DbContext.deleteOne({_id});
                    console.log(result)
                    return {IsSuccess : true}       
            }
            else return {isSuccess : false , Errors : "obj not found"}
        } catch (error) {
            return {isSuccess : false,Errors : error}
        }   
    }
    
    

}

module.exports = CRUDBase