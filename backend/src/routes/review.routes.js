const express = require("express")
const router  = express.Router()

const {createReview, deleteReview, getReview, updateReview} = require("../controllers/reviewController")

router.post("/createReview/:userId", createReview)
router.delete("/deleteReview/:userId", deleteReview)
router.put("/updateReview/:userId", updateReview)
router.get("/getReview/:userId", getReview)

module.exports = router;