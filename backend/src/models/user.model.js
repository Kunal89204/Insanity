const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullname:{
      type:String, 
      required:true
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
    profileImg: {
      type: String,
    },
    age: {
      type: Number,
    },
    address: {
      street: String,
      city: String,
      state: String,
      zip: String,
      country: String,
    },
    refreshToken : {
      type:String
    },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  },
  
  { timestamps: true }
);


userSchema.pre("save", async function(next) {
    try {
        const user = this;
        if (!user.isModified("password")) {
          return next();
        }
    
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        next();
    } catch (error) {
        console.log(error)
    }
})

userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

  // Generate access token
userSchema.methods.generateAccessToken = function() {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
    },
    'shhh',
    {
      expiresIn: '20h', // Access token expires in 2 hours
    }
  );
};

// Generate refresh token
userSchema.methods.generateRefreshToken = function() {
  return jwt.sign(
    {
      _id: this._id,
    },
    'shhh',
    {
      expiresIn: '24h', // Refresh token expires in 24 hours
    }
  );
};



module.exports = mongoose.model("user", userSchema);
