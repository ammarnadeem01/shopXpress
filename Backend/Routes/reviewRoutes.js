const express = require("express");
const router = express.Router();
const userControllers = require("../Controllers/userController");
const reviewControllers = require("../Controllers/reviewController");
router.route("/").post(userControllers.protect, reviewControllers.addReview);
router.route("/product/:id").get(
  // userControllers.protect,
  // userControllers.restrict("Admin"),
  reviewControllers.specificProductReviews
);

router
  .route("/user/:id")
  .get(
    userControllers.protect,
    userControllers.restrict("Admin"),
    reviewControllers.specificUserReviews
  );

router
  .route("/:id")
  .delete(
    userControllers.protect,
    userControllers.restrict("Admin"),
    reviewControllers.deleteSpecificReviews
  )
  .patch(
    userControllers.protect,
    userControllers.restrict("Admin"),
    reviewControllers.editReview
  );

module.exports = router;
