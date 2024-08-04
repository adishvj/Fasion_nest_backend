// const mongoose =require("mongoose")
// const cartschema = new mongoose.Schema({
//     product_id:{type:mongoose.Types.ObjectId,
//         required:true,
//         ref:"product"
//     },
//     user_id:{type:mongoose.Types.ObjectId,
//         required:true
//     },
//     quandity:{type:Number,
//         required:true
//     }
  
// })
// const cartDB = mongoose.model("cart",cartschema)
// module.exports=cartDB

const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'auth',
    required: true
  },
 
  status: {
    type: String,
    default:"pending"
  },
  
  quantity: {
    type: Number,
    required: true
  },
  
});

const cartDB = mongoose.model('Cart', cartSchema);
module.exports = cartDB;