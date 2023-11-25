const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
  reviewedProduct: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
  },
  reviewedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  review: {
    type: String,
  },
  ratings: {
    type: Number,
  },
  reviewDate: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Review", reviewSchema);
