const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    report: {
      type: String,
      required: [true, "please add report field"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);
