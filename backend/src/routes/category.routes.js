const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer.middleware")

const {
  addCategory,
  deleteCategory,
  getCategory,
  updateCategory,
} = require("../controllers/categoryController");

router.post("/addCategory", upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'banner', maxCount: 1 }]), addCategory);
router.put("/updateCategory/:id",upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'banner', maxCount: 1 }]), updateCategory);
router.delete("/deleteCategory/:id", deleteCategory);
router.get("/getCategory", getCategory);

module.exports = router;
