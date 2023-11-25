const Review = require("../Models/reviewModel");

// createAReview
exports.addReview = async (req, res) => {
  try {
    const userId = req.body.userId;
    const productId = req.body.productId;
    const review = req.body.review;
    const ratings = req.body.ratings;
    const newReview = await Review.create({
      reviewedProduct: productId,
      reviewedBy: userId,
      review,
      ratings,
    });
    res.status(201).json({
      status: "Success",
      data: {
        newReview,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};

// reviews related to product
exports.specificProductReviews = async (req, res) => {
  try {
    const id = req.params.id;
    const specificProductReviews = await Review.find({ reviewedProduct: id });
    res.status(200).json({
      status: "Success",
      length: specificProductReviews.length,
      data: {
        specificProductReviews,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};
exports.specificUserReviews = async (req, res) => {
  try {
    const id = req.params.id;
    const specificUserReviews = await Review.find({ reviewedBy: id });
    res.status(200).json({
      status: "Success",
      length: specificUserReviews.length,
      data: {
        specificUserReviews,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};
