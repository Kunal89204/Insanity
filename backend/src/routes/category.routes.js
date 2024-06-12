const express = require("express");
const router = express.Router();

const {
  addCategory,
  deleteCategory,
  getCategory,
  updateCategory,
} = require("../controllers/categoryController");

router.post("/addCategory", addCategory);
router.put("/updateCategory/:id", updateCategory);
router.delete("/deleteCategory/:id", deleteCategory);
router.get("/getCategory", getCategory);

module.exports = router;
