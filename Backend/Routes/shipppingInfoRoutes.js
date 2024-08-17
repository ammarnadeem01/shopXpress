const express = require("express");
const router = express.Router();
const userControllers = require("../Controllers/userController");
const shippingInfoControllers = require("../Controllers/shippingInfoController");
router
  .route("/")
  .post(userControllers.protect, shippingInfoControllers.addShippingInfo);
router
  .route("/:id")
  .get(
    userControllers.protect,
    userControllers.restrict("Admin"),
    shippingInfoControllers.getShippingInfo
  );

module.exports = router;
