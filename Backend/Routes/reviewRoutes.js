const express = require("express");
const router = express.Router();
const reviewControllers = require("../Controllers/reviewController");
router.route("/").post(reviewControllers.addReview);
router.route("/product/:id").get(reviewControllers.specificProductReviews);

router.route("/user/:id").get(reviewControllers.specificUserReviews);

router
  .route("/:id")
  .delete(reviewControllers.deleteSpecificReviews)
  .patch(reviewControllers.editReview);

module.exports = router;
