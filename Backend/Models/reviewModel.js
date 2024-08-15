const Product = require("../Models/productsModel");
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

reviewSchema.post("save", async function (doc, next) {
  const productId = doc.reviewedProduct;
  console.log("after save : ", productId);
  await updateProductRating(productId);
  next();
});

reviewSchema.post("remove", async function (doc, next) {
  const productId = doc.reviewedProduct;
  console.log("after deletion : ", productId);
  await updateProductRating(productId);
  next();
});

reviewSchema.pre("findByIdAndUpdate", async function (next) {
  const update = this.getUpdate();
  console.log("update", update);
  if (update.ratings) {
    const productId = this._conditions.reviewedProduct;
    await updateProductRating(productId);
  }
  next();
});

async function updateProductRating(productId) {
  const reviews = await this.model.find({ reviewedProduct: productId });
  const avgRating =
    reviews.length > 0
      ? reviews.reduce((acc, review) => acc + review.ratings, 0) /
        reviews.length
      : 0;

  await Product.findByIdAndUpdate(productId, { avgRating });
}
module.exports = mongoose.model("Review", reviewSchema);
