const express = require("express");
const router = express.Router();
const OrderControllers = require("../Controllers/orderController");
router.route("/")
  .post(OrderControllers.placeOrder)
  .get(OrderControllers.getAllOrders);

module.exports = router;
