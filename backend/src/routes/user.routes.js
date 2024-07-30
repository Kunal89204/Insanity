const express = require("express")
const router = express.Router();
const {loginUser, registerUser, editProfile, getUsers, validate_token} = require("../controllers/userController")
const upload = require("../middlewares/multer.middleware")
const requireAuth = require("../middlewares/requireAuth");
const checkAdminRole = require("../middlewares/checkAdminRole");


router.post("/login",  loginUser)
router.post("/register", registerUser)
router.get("/getUsers",requireAuth,  getUsers)
router.post("/editProfile/:userId", upload.single("avatar"), editProfile)
router.get('/validate-token', requireAuth, validate_token)





module.exports = router;