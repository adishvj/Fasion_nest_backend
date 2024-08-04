const mongoose=require("mongoose")

const auth_schema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },

    phone:{
        type:String,
        required:true
    },
    
    


})
const authDB=mongoose.model("auth",auth_schema)
module.exports=authDB