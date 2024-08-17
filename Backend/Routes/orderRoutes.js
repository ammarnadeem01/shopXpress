const express = require("express");
const router = express.Router();
const userControllers = require("../Controllers/userController");
const OrderControllers = require("../Controllers/orderController");
router
  .route("/")
  .post(userControllers.protect, OrderControllers.placeOrder)
  .get(
    userControllers.protect,
    userControllers.restrict("Admin"),
    OrderControllers.getAllOrders
  );
router
  .route("/:id")
  .get(
    userControllers.protect,
    userControllers.restrict("Admin"),
    OrderControllers.getSpecificOrder
  )
  .delete(
    userControllers.protect,
    userControllers.restrict("Admin"),
    OrderControllers.deleteOrder
  )
  .patch(
    userControllers.protect,
    userControllers.restrict("Admin"),
    OrderControllers.updateOrderStatus
  );
router
  .route("/user/:id")
  .get(userControllers.protect, OrderControllers.specificUserOrder);
module.exports = router;
