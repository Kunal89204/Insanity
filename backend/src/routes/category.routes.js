const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer.middleware")

const {
  addCategory,
  deleteCategory,
  getCategory,
  updateCategory,
  eachCategory
} = require("../controllers/categoryController");

router.post("/addCategory", upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'banner', maxCount: 1 }]), addCategory);
router.put("/updateCategory/:id",upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'banner', maxCount: 1 }]), updateCategory);
router.delete("/deleteCategory", deleteCategory);
router.get("/getCategory", getCategory);
router.get("/eachCategory/:name", eachCategory);

module.exports = router;
