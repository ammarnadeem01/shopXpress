const asyncErrorHandler = require('./../Utils/asyncErrorHandler');
const CustomError = require('./../Utils/CustomError');
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

exports.editReview=async(req,res)=>{
    try {
      const editedReview = await Review.findByIdAndUpdate(req.params.id,{
            ratings:req.body.ratings,
            review:req.body.review
      },{runValidators:true,new:true})
      res.status(201).json({
        status:"Success",
        data:{
          editedReview
        }
      })
      
    } catch (error) {
      res.status(404).json({
        status:"Failure",
        message:error.message
      }) 
    }
}




// // Controller method for product reviews
exports.specificProductReviews = async (req, res) => {
  try {
    console.log(req.params.id)
    const productReviews = await Review.find({ reviewedProduct: req.params.id });
    res.status(200).json({
      status: "Success",
      data: {
        reviews: productReviews,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};




// Controller method for user reviews
exports.specificUserReviews = async (req, res) => {
  try {
    
    const userReviews = await Review.find({ reviewedBy: req.params.id });
    res.status(200).json({
      status: "Success",
      data: {
        reviews: userReviews,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: error.message,
    });
  }
};

// Controller method for deleting a review
exports.deleteSpecificReviews = async (req, res) => {
  try {
    const review = await Review.findByIdAndRemove(req.params.id);
    if (!review) {
      return res.status(404).json({
        status: "Fail",
        message: "Review not found",
      });
    }
    res.status(204).json({
      status: "Success",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: error.message,
    });
  }
};
