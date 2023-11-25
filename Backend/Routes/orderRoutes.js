const express = require("express");
const router = express.Router();
const OrderControllers = require("../Controllers/orderController");
router.route("/").post(OrderControllers.placeOrder);

module.exports = router;
