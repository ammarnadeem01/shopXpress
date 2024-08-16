const express = require("express");
const router = express.Router();
const OrderControllers = require("../Controllers/orderController");
router
  .route("/")
  .post(OrderControllers.placeOrder)
  .get(OrderControllers.getAllOrders);
router
  .route("/:id")
  .get(OrderControllers.getSpecificOrder)
  .delete(OrderControllers.deleteOrder)
  .patch(OrderControllers.updateOrderStatus);
router.route("/user/:id").get(OrderControllers.specificUserOrder);
module.exports = router;
