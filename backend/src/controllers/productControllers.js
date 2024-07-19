const Product = require("../models/product.model");


const addProduct = async (req, res) => {
  try {
    let { name, price, discountedPrice, category, description, stock, dimensions } = req.body;
    const images = req.files?.images || [];
    const video = req.files?.video ? req.files.video[0] : null;

    // Validation for compulsory fields
    if (!name || !price || images.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Name, price, and at least one image are required.",
      });
    }

    // Extracting filenames from the uploaded files
    const imageFilenames = images.map((file) => file.filename);
    const videoFilename = video ? video.filename : null;
    dimensions = JSON.parse(dimensions)

    const product = new Product({
      name,
      price,
      discountedPrice,
      images: imageFilenames,
      video: videoFilename,
      category,
      description,
      stock,
      dimensions: {
        length: dimensions.length,
        width: dimensions.width,
        height: dimensions.height,
        weight: dimensions.weight,
      },
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: product,
    });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
const getProduct = async (req, res) => {
  try {
    const productData = await Product.find()
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
