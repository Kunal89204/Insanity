const Product = require("../models/product.model");

const addProduct = async (req, res) => {
  try {
    // Extracting fields from the request body
    const {
      name,
      price,
      video,
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
    await newProduct.save();

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

const getProduct = async (req, res) => {
  try {
    const productData = await Product.find() .populate('owner')
    .populate('category');
    res.json(productData);
  } catch (error) {
    console.log(error);
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const productData = await Product.findById(id);
    res.json(productData);
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedProduct = await Product.findByIdAndDelete(id);
    res.json(deletedProduct);
  } catch (error) {
    console.log(error);
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const {
      name,
      price,
      video,
      discountedPrice,
      category,
      description,
      owner,
      dimensions,
      stock,
    } = req.body;

    const files = req.files ? req.files : null;
    const images = [];

    if (files !== null) {
      files.forEach((element) => {
        images.push(element.filename);
      });
    }

    // Construct update object based on provided fields in the request body
    const updateFields = {};
    if (name) updateFields.name = name;
    if (price) updateFields.price = price;
    if (video !== undefined) updateFields.video = video;
    if (discountedPrice !== undefined)
      updateFields.discountedPrice = discountedPrice;
    if (files !== null) updateFields.images = images;
    if (category) updateFields.category = category;
    if (description !== undefined) updateFields.description = description;
    if (owner) updateFields.owner = owner;
    if (dimensions) updateFields.dimensions = dimensions;
    if (stock !== undefined) updateFields.stock = stock;

    // Update product
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $set: updateFields },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while updating the product",
      error: error.message,
    });
  }
};

module.exports = {
  addProduct,
  getProduct,
  getSingleProduct,
  deleteProduct,
  updateProduct,
};
