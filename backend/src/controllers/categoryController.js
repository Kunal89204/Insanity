const Category = require("../models/category.model");

const addCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      res.json({ message: "Category already exists" });
    }

    const newCatgeory = await Category.create({ name, description });

    res.json(newCatgeory);
  } catch (error) {
    console.log(error);
  }
};


const getCategory = async (req, res) => {
    try {
        const categories= await Category.find()
        res.json(categories)
    } catch (error) {
        console.log(error)
    }
}

const deleteCategory = async (req, res) =>{
    try {
        const id = req.params.id;
       
        const deletedCategory = await Category.findByIdAndDelete(id)

        res.json(deletedCategory)
    } catch (error) {
        console.log(error)
    }
}
const updateCategory = async (req, res) =>{
    try {
        const id = req.params.id;
      
        const newCategory = await Category.findByIdAndUpdate(id, req.body)

        res.json(newCategory)
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