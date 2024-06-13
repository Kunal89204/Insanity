const express = require("express")
const router = express.Router()
const {addCart, reduceProductQuantity, removeProduct, emptyCart} = require("../controllers/cartController")

router.post("/addToCart/:userId", addCart)
router.post("/reduceProductQuantity/:userId", reduceProductQuantity)
router.post("/removeProduct/:userId", removeProduct)
router.post("/emptyCart/:userId", emptyCart)

module.exports = router;