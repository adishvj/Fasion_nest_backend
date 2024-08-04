const express = require("express");
const productsRoutes = express.Router()


const productDB = require("../Models/productsschema");

const multer = require('multer'); //image uploading package
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME, //env stores the sensitive data
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});
const storageImage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
      folder: 'ecommerce/products',
  },
});
const uploadImage = multer({ storage: storageImage });


productsRoutes.post('/addProduct',uploadImage.single("image"), async (req, res) => {
  try {
    const Data = {
      title: req.body.title,
      description: req.body.description,
      review: req.body.review,
      image:req.file.path,
      seller:req.body.seller,
      price:req.body.price,
      category:req.body.category,
      rate:req.body.rate,
      quandity:req.body.quandity,



    };
    const data = await productDB(Data).save();
    if (data) {
      return res.status(201).json({
        Success: true,
        Error: false,
        Message: 'Data added successfully',
        data: data,
      });
    } else {
      return res.status(400).json({
        Error: true,
        Success: false,
        Message: 'Error, Data no added',
      });
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      Error: true,
      Success: false,
      Message: 'Internal server error',
      ErrorMessage: error,
    }); 
  }

});

productsRoutes.get('/viewProduct',uploadImage.single("image"), async (req, res) => {
  await productDB
    .find()
    .then((data) => {
      return res.status(200).json({
        Success: true,
        Error: false,
        data: data,
      });
    })
    .catch((error) => {
      return res.status(400).json({
        Success: false,
        Error: true,
        ErrorMessage: error,
      });
    });
});

productsRoutes.put('/updateProduct/:id', async (req, res) => {
  try {

    const oldData = await productDB.findOne({ _id: req.params.id })
    console.log(oldData);
    const Data = {
      name: req.body.name ? req.body.name : oldData.name,
      price: req.body.price ? req.body.price : oldData.price,
      description: req.body.description ? req.body.description : oldData.description,
      image: req.file ? req.file.path : oldData.image

    }
    console.log("Dataaa.....", Data);

    const updateData = await productDB.updateOne({ _id: req.params.id }, { $set: Data })
    console.log(updateData);

    if (updateData.modifiedCount == 1) {
      return res.status(200).json({
        Success: true,
        Error: false,
        Message: 'Data updated successfully',
        data: updateData,
      });

    } else if (updateData.modifiedCount == 0) {
      return res.status(200).json({
        Success: true,
        Error: false,
        Message: 'Data already updated ',
        data: updateData,
      });
    }

    else {
      return res.status(400).json({
        Error: true,
        Success: false,
        Message: 'Error, Data not updated',
      });
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      Error: true,
      Success: false,
      Message: 'Internal server error',
      ErrorMessage: error,
    });
  }
})
productsRoutes.delete('/deleteProduct/:id', async (req, res) => {
  try {
    const result = await productDB.deleteOne({ _id: req.params.id });
    console.log(result)

    if (result.deletedCount === 1) {
      return res.status(200).json({
        Success: true,
        Error: false,
        Message: 'Data deleted successfully',
      });
    } else {
      return res.status(404).json({
        Error: true,
        Success: false,
        Message: 'Error, Data not found',
      });
    }
  } catch (error) {
    return res.status(500).json({
      Error: true,
      Success: false,
      Message: 'Internal server error',
      ErrorMessage: error,
    });
  }
});




module.exports = productsRoutes
