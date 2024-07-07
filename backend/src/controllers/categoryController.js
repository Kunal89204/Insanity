const Category = require("../models/category.model");

const addCategory = async (req, res) => {
    try {
        const { name, description, subCategories } = req.body;
        const thumbnail = req.files['thumbnail'][0].filename;
        const banner = req.files['banner'][0].filename;

        // Check if category with the same name already exists
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ message: "Category already exists" });
        }

        // Ensure subCategories is an array of strings
        const subCategoriesArray = Array.isArray(subCategories) ? subCategories : subCategories.split(",").map(subCategory => subCategory.trim());

        // Create a new category instance
        const newCategory = new Category({
            name,
            description,
            images: {
                thumbnail,
                banner
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
        const id = req.params.id;

        const deletedCategory = await Category.findByIdAndDelete(id)

        res.json(deletedCategory)
    } catch (error) {
        console.log(error)
    }
}



module.exports = {
    getCategory,
    addCategory,
    deleteCategory,
    updateCategory
}