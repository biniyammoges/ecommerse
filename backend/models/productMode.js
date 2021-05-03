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
    default: "no-image.png",
  },
  price: {
    type: String,
    required: [true, "Please add product price"],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Please add product category"],
    ref: "Category",
  },
  rating: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
