const asyncErrorHandler = require('./../Utils/asyncErrorHandler');
const CustomError = require('./../Utils/CustomError');
const Review = require("../Models/reviewModel");

// createAReview
exports.addReview = asyncErrorHandler(async (req, res,next) => {
    const { userId, productId, review, ratings } = req.body;
  
    if (!userId || !productId || !review || ratings == null) {
      return next(new CustomError("userId, productId, review, or ratings is missing.", 400));
    }
    
    if (ratings < 0.5 || ratings > 5) {
      return next(new CustomError("Ratings must be between 0.5 and 5.", 400));
    }
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
});

exports.editReview=asyncErrorHandler(async(req,res,next)=>{
  const { id } = req.params;
  const { ratings, review } = req.body;
  if (!id) {
    return next(new CustomError("Review ID is missing", 400));
  }
  if (ratings == null || !review) {
    return next(new CustomError("Review and ratings are required", 400));
  }
  if (ratings < 1 || ratings > 5) {
    return next(new CustomError("Ratings must be between 0.5 and 5.", 400));
  }
  const existingReview = await Review.findById(id);
  if (!existingReview) {
    return next(new CustomError("No review found with the given ID.", 404));
  }
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
})


// // Controller method for product reviews
exports.specificProductReviews =asyncErrorHandler( async (req, res,next) => {
    if(!req.params?.id)
    {
      return next(new CustomError("Product ID is missing",400))
    }
    const productReviews = await Review.find({ reviewedProduct: req.params.id });
    res.status(200).json({
      status: "Success",
      data: {
        reviews: productReviews,
      },
    });
});




// Controller method for user reviews
exports.specificUserReviews = asyncErrorHandler(async (req, res,next) => {
    if(!req.params?.id)
    {
      return next(new CustomError("User ID is missing",400))
    }
    const userReviews = await Review.find({ reviewedBy: req.params.id });
    res.status(200).json({
      status: "Success",
      data: {
        reviews: userReviews,
      },
    });
});

// Controller method for deleting a review
exports.deleteSpecificReviews = asyncErrorHandler(async (req, res,next) => {
  if(!req.params?.id)
  {
    return next(new CustomError("Review ID is missing",400))
  }
    const review = await Review.findByIdAndRemove(req.params.id);
    if (!review) {
      return next(new CustomError("No review with given ID found...",404))
    }
    res.status(204).json({
      status: "Success",
      data: null,
    });
})

