const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
    content: { type: String, required: true },
    isEdited: {type:Boolean, default:false}
}, {timestamps:true})

module.exports = mongoose.model("review", reviewSchema)