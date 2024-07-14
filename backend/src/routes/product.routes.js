const express = require("express")
const router = express.Router()
const upload = require("../middlewares/multer.middleware")

const {addProduct, getProduct, getSingleProduct, deleteProduct, updateProduct} =require("../controllers/productControllers")

// router.post("/addProduct", upload.array("img") , addProduct)
router.post("/addProduct",  addProduct)

router.get("/getProduct", getProduct)

router.get("/getSingleProduct/:id", getSingleProduct)

router.delete("/deleteProduct/:id", deleteProduct)

router.put("/updateProduct/:id", updateProduct)

module.exports = router

