const Category = require("../models/category.model");
const Product = require('../models/product.model')
const { uploadOnCloudinary, deleteFromCloudinary } = require("../utils/cloudinary")

const addCategory = async (req, res) => {
    try {
        const { name, description, subCategories } = req.body;
        const thumbnailLocalpath = req.files['thumbnail'][0].path;
        const bannerLocalpath = req.files['banner'][0].path;

        // Check if category with the same name already exists
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ message: "Category already exists" });
        }

        // Ensure subCategories is an array of strings
        const subCategoriesArray = Array.isArray(subCategories) ? subCategories : subCategories.split(",").map(subCategory => subCategory.trim());

        const thumbnail = await uploadOnCloudinary(thumbnailLocalpath)
        const banner = await uploadOnCloudinary(bannerLocalpath)

        // Create a new category instance
        const newCategory = new Category({
            name,
            description,
            images: {
                thumbnail: thumbnail.url,
                banner: banner.url
            },
            subCategories: subCategoriesArray // Ensure subCategories is an array
        });

        // Save the new category to the database
        await newCategory.save();

        res.status(201).json({ newCategory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to add category", error: error.message });
    }
};

const updateCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, description, subCategories } = req.body;

        let thumbnail = null;
        let banner = null;

        // Check if files are present and if they have the expected properties
        if (req.files && req.files['thumbnail'] && req.files['thumbnail'][0]) {
            thumbnail = req.files['thumbnail'][0].filename; // Assuming you're storing the file name
        }

        if (req.files && req.files['banner'] && req.files['banner'][0]) {
            banner = req.files['banner'][0].filename; // Assuming you're storing the file name
        }

        let updatedData = {};

        if (thumbnail) updatedData['images.thumbnail'] = thumbnail;
        if (banner) updatedData['images.banner'] = banner;
        if (name) updatedData.name = name;
        if (description) updatedData.description = description;
        if (subCategories) updatedData.subCategories = subCategories; // Update subCategories

        // Update the category in the database
        const updatedCategory = await Category.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.json(updatedCategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while updating the category", error: error.message });
    }
};

const getCategory = async (req, res) => {
    try {
        const categories = await Category.find()
        res.json(categories)
    } catch (error) {
        console.log(error)
    }
}

const deleteCategory = async (req, res) => {
    try {
        const { id, bannerId, thumbnailId } = req.body;



        // Proceed with your deletion logic
        const deletedCategory = await Category.findByIdAndDelete(id);
        // Also delete the banner and thumbnail as needed

        const getbannerIdFromUrl = (url) => {
            const parts = url.split('/');
            const fileName = parts[parts.length - 1];
            const publicId = fileName.split('.')[0];
            return publicId;
        };
        const getthumbnailIdFromUrl = (url) => {
            const parts = url.split('/');
            const fileName = parts[parts.length - 1];
            const publicId = fileName.split('.')[0];
            return publicId;
        };

        const deletePromises = [
            deleteFromCloudinary(getbannerIdFromUrl(bannerId)),
            deleteFromCloudinary(getthumbnailIdFromUrl(thumbnailId))
        ]

        const response = await Promise.all(deletePromises)

        response.forEach((respo) => {
            console.log(respo)
        })



        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error deleting category', error });
    }
};



const eachCategory = async (req, res) => {
    try {
        const name = req.params.name
        const data = await Category.findOne({ name })
        const catId = data._id
        const Products = await Product.find({ category: catId })
        res.json({ data, Products })
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    getCategory,
    addCategory,
    deleteCategory,
    updateCategory,
    eachCategory
}