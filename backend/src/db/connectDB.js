const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        .then(() => { 
            console.log("database connected")
        })
        .catch((error) => {
            console.log("the erorr is ", error)
        })
    } catch (error) {
        console.log("the rroror is",error)
    }
}


module.exports = connectDB;