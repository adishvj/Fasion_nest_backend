const express = require('express');
// const cartDB = require('../Models/cartschema');
const productDB = require('../Models/productsschema');
const wishDB = require('../Models/wishlistschema');
const wishRouter = express.Router();

// Add item to cart
wishRouter.post('/addItemWishlist', async (req, res) => {
  try {
    const { productId, userId } = req.body;
    
    
    const product = await productDB.findById(productId);
    console.log(product);
    if (!product) {
      return res.status(404).json({
        Success: false,
        Error: true,
        Message: 'Product not found'
      });
    }

    const newItem = new wishDB({
      productId: product._id,
      userId: userId,
      

    });
    const savedItem = await newItem.save();
    res.status(201).json({
      Success: true,
      Error: false,
      Message: 'Item added to wishlist successfully',
      data: savedItem
    });
  } catch (error) {
    res.status(500).json({
      Success: false,
      Error: true,
      Message: 'Failed to add item to wishlist',
      ErrorMessage: error.message
    });
  }
});

// Update item in cart
// cartRouter.put('/updateItemWishlist/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatedData = {
//       quantity: req.body.quantity
//     };

//     const updatedItem = await cartDB.findByIdAndUpdate(id, updatedData, { new: true });

//     if (updatedItem) {
//       res.status(200).json({
//         Success: true,
//         Error: false,
//         Message: 'Item updated successfully',
//         data: updatedItem
//       });
//     } else {
//       res.status(400).json({
//         Success: false,
//         Error: true,
//         Message: 'Failed to update item in cart'
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       Success: false,
//       Error: true,
//       Message: 'Internal server error',
//       ErrorMessage: error.message
//     });
//   }
// });

// Remove item from cart
wishRouter.delete('/removeItemWishlist/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const removedItem = await wishDB.findByIdAndDelete(id);

    if (removedItem) {
      res.status(200).json({
        Success: true,
        Error: false,
        Message: 'Item removed from cart successfully',
        data: removedItem
      });
    } else {
      res.status(400).json({
        Success: false,
        Error: true,
        Message: 'Failed to remove item from cart'
      });
    }
  } catch (error) {
    res.status(500).json({
      Success: false,
      Error: true,
      Message: 'Internal server error',
      ErrorMessage: error.message
    });
  }
});

// Get all items in cart for a specific user
wishRouter.get('/viewWishlist/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const WishItems = await wishDB.find({ userId }).populate('productId');

    res.status(200).json({
      Success: true,
      Error: false,
      Message: 'Cart items retrieved successfully',
      data: WishItems
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      Success: false,
      Error: true,
      Message: 'Failed to retrieve cart items',
      ErrorMessage: error.message
    });
  }
});

module.exports = wishRouter;