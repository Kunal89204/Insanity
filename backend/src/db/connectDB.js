const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        .then(() => { 
            console.log("database connected")
        })
        .catch((error) => {
            console.log(error)
        })
    } catch (error) {
        console.log(error)
    }
}


module.exports = connectDB;