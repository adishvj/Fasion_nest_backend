const mongoose =require("mongoose")
const productsschema = new mongoose.Schema({
    title:{type:String,
        required:true
    },
    description:{type:String,
        required:true
    },
    review:{type:String,
        required:true
    },
    image:{type:String,
        required:true
    },
    seller:{type:String,
        required:true
    },
    price:{type:Number,
        required:true
    },
    category:{type:String,
        required:true
    },
    rate:{type:Number,
        required:true
    },
    quandity:{type:Number,
        required:true
    }
})
const productDB = mongoose.model("product",productsschema)//collection name is product
module.exports=productDB
