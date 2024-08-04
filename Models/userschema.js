const mongoose =require("mongoose")
const userschema = new mongoose.Schema({
    name:{type:String,
        required:true
    },
    age:{type:Number,
        required:true
    },
    email:{type:String,
        required:true
    }
})
const userDB = mongoose.model("user",userschema)//collection name is product
module.exports=userDB