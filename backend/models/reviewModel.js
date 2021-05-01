const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Please add text field"],
    },
    rating: {
      type: Number,
      required: [true, "Please add rating"],
      min: [0, "Rating can't be less than 0"],
      max: [5, "Rating can't be more than 5"],
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please add product id"],
      ref: "Product",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please add user id"],
      ref: "User",
    },
  },
  { timestamps: true }
);

// Prevent user from submitting more than one review
reviewSchema.index({ product: 1, user: 1 }, { unique: true });

reviewSchema.statics.getAverageRating = async function (productId) {
  const obj = await this.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: "$product",
        rating: { $avg: "$rating" },
      },
    },
  ]);

  try {
    await this.model("Product").findByIdAndUpdate(productId, {
      rating: obj[0].rating,
    });
  } catch (err) {
    console.log(err);
  }
};

// Calculate average rating after saving
reviewSchema.post("save", async function () {
  await this.constructor.getAverageRating(this.product);
});

// Calculate average rating after saving
reviewSchema.pre("remove", async function () {
  await this.constructor.getAverageRating(this.product);
});

module.exports = mongoose.model("Review", reviewSchema);
