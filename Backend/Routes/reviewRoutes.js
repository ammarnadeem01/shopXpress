const express = require("express");
const router = express.Router();
const reviewControllers = require("../Controllers/reviewController");
router.route("/").post(reviewControllers.addReview);
router
  .route("/:id")
  .get(reviewControllers.specificProductReviews)
  .get(reviewControllers.specificUserReviews);
module.exports = router;
