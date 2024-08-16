const mongoose =require('mongoose');
const wishlistschema = new mongoose.Schema({
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
   
    
  });
  const wishDB = mongoose.model('wishlist', wishlistschema);
  module.exports = wishDB;