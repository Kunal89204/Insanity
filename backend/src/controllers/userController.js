const User = require("../models/user.model");

const loginUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    const existingUser = await User.findOne({ username, role });

    if (!existingUser) {
      return res.json({ message: "user doesn't exist" });
    }

    const isPasswordValid = await existingUser.comparePassword(password);
    if (!isPasswordValid) {
      return res.json({ message: "Invalid  password" });
    }

     // Generate access and refresh tokens
     const accessToken = existingUser.generateAccessToken();
     const refreshToken = existingUser.generateRefreshToken();
 
     // Save refresh token to user document (if needed)
     existingUser.refreshToken = refreshToken;
     await existingUser.save();
 
     // Set refresh token as a cookie
     res.cookie('refreshToken', refreshToken, {
       httpOnly: true,
       maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
       secure: true,
       sameSite: 'strict',
     });
 
     // Send access token in response
     res.json({ accessToken, role, username:existingUser.username });
  } catch (error) {
    console.log(error);
  }
};

const registerUser = async (req, res) => {
  try {
    const {fullname,  username, password } = req.body;

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(200).json({ message: "Username already exists" });
    }

    const newUser = await User.create({
      username,
      password,
      fullname
    });

    // Generate access and refresh tokens
    const accessToken = newUser.generateAccessToken();
    const refreshToken = newUser.generateRefreshToken();

    // Save refresh token to user document (if needed)
    newUser.refreshToken = refreshToken;
    await newUser.save();

    // Set refresh token as a cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      secure: true,
      sameSite: 'strict',
    });

    // Send access token in response
    res.json({ accessToken });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: "An error occurred while registering user",
        error: error.message,
      });
  }
};

const editProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { age, street, city, state, zip, country } = req.body;
    // Check if a file was uploaded
    const filekanaam = req.file ? req.file.filename : null;

    

    // Construct update object based on provided fields in the request body
    const updateFields = {};
    if (age) updateFields.age = age;
    if (filekanaam !== null) updateFields.profileImg = filekanaam;
    if (street) updateFields["address.street"] = street;
    if (city) updateFields["address.city"] = city;
    if (state) updateFields["address.state"] = state;
    if (zip) updateFields["address.zip"] = zip;
    if (country) updateFields["address.country"] = country;

    // Update user profile
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while updating the profile",
      error: error.message,
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    console.log(error)
  }
}

const validate_token = async (req, res) => {
  try {
    res.status(200).json({ valid: true })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  loginUser,
  registerUser,
  editProfile,
  getUsers,
  validate_token
};
