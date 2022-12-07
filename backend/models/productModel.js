const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter product Name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please Enter Product Description"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter product Price"],
    maxlength: [8, "Price connot exceed 8 characters"],
  },
  ratings: { type: Number, default: 0 },
  category: {
    type: String,
    required: [true, "Please Enter Product Category"],
  },
  images: [
    {
      public_id: { type: String, required: true },
      url: { type: String, required: true },
    },
  ],
  stock: {
    type: Number,
    required: [true, "Please Enter product Stock"],
    maxlength: [4, "Stock cannot exceed 4 cahracters"],
    default: 1,
  },
  numOfReviews: { type: Number, default: 0 },
  reviews: [
    {
      user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
      name: { type: String, required: true },
      rating: { type: Number, required: true },
      comment: { type: String, required: true },
    },
  ],
  user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", productSchema);
