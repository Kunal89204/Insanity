const express = require("express")
const router = express.Router();
const {loginUser, registerUser, editProfile, getUsers} = require("../controllers/userController")
const upload = require("../middlewares/multer.middleware")

router.post("/login",  loginUser)
router.post("/register", registerUser)
router.get("/getUsers", getUsers)
router.post("/editProfile/:userId", upload.single("avatar"), editProfile)





module.exports = router;