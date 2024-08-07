const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },

    discountedPrice: {
      type: Number,
    },

    images: [{ type: String }],
    video: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "review" }],
    description: { type: String },
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
      weight: Number,
    },
    stock: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", productSchema);
