// const express = require("express");
// const Cart = require("../Models/cartschema");
// const cartRouter = express.Router();

// // Create a new cart item
// cartRouter.post("/add", async (req, res) => {
//   try {
//     const { product_id, user_id, quantity } = req.body;
//     const newCartItem = new Cart({
//       product_id,
//       user_id,
//       quantity,
//     });
//     const savedCartItem = await newCartItem.save();
//     res.status(201).json({
//       Success: true,
//       Error: false,
//       Message: "Cart item added successfully",
//       data: savedCartItem,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       Success: false,
//       Error: true,
//       Message: "Internal Server Error",
//     });
//   }
// });

// // View all cart items for a user
// cartRouter.get("/view/:userId", async (req, res) => {
//   try {
//     const cartItems = await Cart.find({ user_id: req.params.userId }).populate("product_id");
//     res.status(200).json({
//       Success: true,
//       Error: false,
//       data: cartItems,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       Success: false,
//       Error: true,
//       Message: "Internal Server Error",
//     });
//   }
// });

// // Update a cart item
// cartRouter.put("/update/:id", async (req, res) => {
//   try {
//     const { quantity } = req.body;
//     const updatedCartItem = await Cart.findByIdAndUpdate(
//       req.params.id,
//       { quantity },
//       { new: true }
//     );
//     if (!updatedCartItem) {
//       return res.status(404).json({
//         Success: false,
//         Error: true,
//         Message: "Cart item not found",
//       });
//     }
//     res.status(200).json({
//       Success: true,
//       Error: false,
//       Message: "Cart item updated successfully",
//       data: updatedCartItem,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       Success: false,
//       Error: true,
//       Message: "Internal Server Error",
//     });
//   }
// });

// // Delete a cart item
// cartRouter.delete("/delete/:id", async (req, res) => {
//   try {
//     const deletedCartItem = await Cart.findByIdAndDelete(req.params.id);
//     if (!deletedCartItem) {
//       return res.status(404).json({
//         Success: false,
//         Error: true,
//         Message: "Cart item not found",
//       });
//     }
//     res.status(200).json({
//       Success: true,
//       Error: false,
//       Message: "Cart item deleted successfully",
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       Success: false,
//       Error: true,
//       Message: "Internal Server Error",
//     });
//   }
// });

// module.exports = cartRouter;


const express = require('express');


const cartDB = require('../Models/cartschema');
const productDB = require('../Models/productsschema');
const cartRouter = express.Router();

// Add item to cart
cartRouter.post('/addItem', async (req, res) => {
  try {
    const { productId, quantity, userId } = req.body;

    const product = await productDB.findById(productId);
    if (!product) {
      return res.status(404).json({
        Success: false,
        Error: true,
        Message: 'Product not found'
      });
    }

    const newItem = new cartDB({
      productId: product._id,
      userId: userId,
      
      quantity: quantity,
    });
    const savedItem = await newItem.save();
    res.status(201).json({
      Success: true,
      Error: false,
      Message: 'Item added to cart successfully',
      data: savedItem
    });
  } catch (error) {
    res.status(500).json({
      Success: false,
      Error: true,
      Message: 'Failed to add item to cart',
      ErrorMessage: error.message
    });
  }
});

// Update item in cart
cartRouter.put('/updateItem/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = {
      quantity: req.body.quantity
    };

    const updatedItem = await cartDB.findByIdAndUpdate(id, updatedData, { new: true });

    if (updatedItem) {
      res.status(200).json({
        Success: true,
        Error: false,
        Message: 'Item updated successfully',
        data: updatedItem
      });
    } else {
      res.status(400).json({
        Success: false,
        Error: true,
        Message: 'Failed to update item in cart'
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

// Remove item from cart
cartRouter.delete('/removeItem/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const removedItem = await cartDB.findByIdAndDelete(id);

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
cartRouter.get('/viewCart/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const cartItems = await cartDB.find({ userId }).populate('productId');

    res.status(200).json({
      Success: true,
      Error: false,
      Message: 'Cart items retrieved successfully',
      data: cartItems
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

module.exports = cartRouter;