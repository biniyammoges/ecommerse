const mongoose = require("mongoose");

const restSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add restaurant name"],
      max: [50, "Name can't be more than 50  characters"],
      trim: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

module.exports = mongoose.model("Restaurant", restSchema);
