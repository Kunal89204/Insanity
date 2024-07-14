const Product  = require("../models/product.model")






const addProduct = async (req, res) => {
    try {
      // Extracting fields from the request body
      const {
        name,
        price,
        discountedPrice,
        thumbnail,
        category,
        description,
        owner,
        dimensions,
        stock,
      } = req.body;
  
      // Validating required fields
      if (!name || !price) {
        return res.status(400).json({
          message: "Name and price are required fields",
        });
      }
  
      const files = req.files;
      const images = [];
  
      files.forEach((element) => {
        images.push(element.filename);
      });
  
      // Creating a new product instance with the provided data
      const newProduct = new Product({
        name,
        price,
        video: video || null, // setting default value to null if not provided
        discountedPrice: discountedPrice || null, // setting default value to null if not provided
        thumbnail: thumbnail || null, // setting default value to null if not provided
        images: images || [], // setting default value to an empty array if not provided
        category: category || null, // setting default value to null if not provided
        description: description || null, // setting default value to null if not provided
        owner: owner || null, // setting default value to null if not provided
        dimensions: dimensions || { length: 0, width: 0, height: 0, weight: 0 }, // setting default values for dimensions if not provided
        stock: stock || 0, // setting default value to 0 if not provided
      });
  
      // Save the new product to the database
      // await newProduct.save();
  
      // Send a success response
      res.status(201).json({
        message: "Product added successfully",
        product: newProduct,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "An error occurred while adding the product",
        error: error.message,
      });
    }
  };
module.exports = {addProduct}