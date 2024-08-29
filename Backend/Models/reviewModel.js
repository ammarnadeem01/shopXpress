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
  // console.log("after save : ", productId);
  await updateProductRating(productId, this.constructor);
  next();
});

reviewSchema.post("findOneAndRemove", async function (doc, next) {
  const productId = doc.reviewedProduct;
  // console.log("after deletion : ", productId);
  await updateProductRating(productId, this.model);
  next();
});

reviewSchema.post("findOneAndUpdate", async function (doc, next) {
  const productId = doc.reviewedProduct;

  await updateProductRating(productId, this.model);

  next();
});

async function updateProductRating(productId, reviewModel) {
  // console.log("this in updateProductRating", reviewModel);
  try {
    reviews = await reviewModel.find({ reviewedProduct: productId });
  } catch (error) {
    // console.log("Error fetching reviews:", error);
    // throw new Error("Failed to fetch reviews");
  }
  // console.log("reviews", reviews);
  const avgRating =
    reviews.length > 0
      ? reviews.reduce((acc, review) => acc + review.ratings, 0) /
        reviews.length
      : 0;
  // console.log("avgRating", avgRating);

  await Product.findByIdAndUpdate(productId, { avgRating });
}

module.exports = mongoose.model("Review", reviewSchema);
