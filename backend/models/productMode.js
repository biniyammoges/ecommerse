const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add product name"],
    trim: true,
    maxlength: [50, "Name can not be more than 50 characters"],
  },
  description: {
    type: String,
    required: [true, "Please add product description"],
  },
  image: {
    type: String,
    required: [true, "Please add product image"],
  },
  price: {
    type: String,
    required: [true, "Please add product price"],
    default: "0",
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    // required: [true, "please choose product category"],
    ref: "Category",
  },
  rating: {
    type: Number,
    default: 0,
  },
  reviews: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Review",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
