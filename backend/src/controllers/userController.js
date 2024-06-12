const User = require("../models/user.model")

const loginUser = async (req, res) => {
    try {
        const {username, password, role} = req.body;

        const existingUser = await User.findOne({username, role})

        if (!existingUser) {
            return res.json({message: "user doesn't exist"})
        }

        const isPasswordValid = await existingUser.comparePassword(password);
        if (!isPasswordValid) {
          return res.json({ message: "Invalid username or password" });
        }


        res.json({userId: existingUser._id, role:existingUser.role})

    } catch (error) {
        console.log(error)
    }
}

const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await User.findOne({ username });
    
        if (existingUser) {
          return res.status(200).json({ message: "Username already exists" });
        }
    
        const newUser = await User.create({
          username,
          password,
        });

        res.json({userId: newUser._id})
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    loginUser,
    registerUser
}