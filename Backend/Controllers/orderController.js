const asyncErrorHandler = require("./../Utils/asyncErrorHandler");
const CustomError = require("./../Utils/CustomError");
const Order = require("../Models/orderModel");

exports.placeOrder = asyncErrorHandler(async (req, res, next) => {
  const { placedBy, orderedItems, totalPrice } = req.body;
  if (!placedBy || !orderedItems || totalPrice == null) {
    return next(
      new CustomError(
        "Missing required fields: placedBy, orderedItems, or totalPrice.",
        400
      )
    );
  }
  if (!Array.isArray(orderedItems) || orderedItems.length === 0) {
    return next(
      new CustomError("orderedItems must be a non-empty array.", 400)
    );
  }
  for (const items of orderedItems) {
    if (!items.item || !items.quantity) {
      return next(
        new CustomError(
          "Each ordered item must have an item and quantity.",
          400
        )
      );
    }
  }
  const order = await Order.create({
    orderedItems,
    placedBy,
    totalPrice,
  });
  res.status(200).json({
    status: "Success",
    data: {
      order,
    },
  });
});

exports.getAllOrders = asyncErrorHandler(async (req, res, next) => {
  const order = await Order.find();
  const totalAmount = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalAmount: { $sum: "$totalPrice" },
      },
    },
  ]);

  res.status(200).json({
    status: "Success",
    length: order.length,
    totalAmount: totalAmount.length > 0 ? totalAmount[0].totalAmount : 0,
    data: {
      order,
    },
  });
});

exports.getSpecificOrder = asyncErrorHandler(async (req, res, next) => {
  const id = req.params?.id;
  if (!id) {
    return next(new CustomError("orderID is required.", 400));
  }
  const order = await Order.findById(id);
  if (!order) {
    return next(new CustomError("Order with given id not found.", 404));
  }
  res.status(200).json({
    status: "Success",
    data: {
      order,
    },
  });
});
exports.updateOrderStatus = asyncErrorHandler(async (req, res, next) => {
  const id = req.params?.id;
  if (!id) {
    return next(new CustomError("orderID is required.", 400));
  }
  const status = req.body?.status;
  if (!status) {
    return next(new CustomError("status is required.", 400));
  }
  const order = await Order.findByIdAndUpdate(
    id,
    { status },
    { runValidators: true, new: true }
  );
  if (!order) {
    return next(new CustomError("Order with given id not found.", 404));
  }
  res.status(200).json({
    status: "Success",
    data: {
      order,
    },
  });
});

exports.specificUserOrder = asyncErrorHandler(async (req, res, next) => {
  const id = req.params?.id;
  if (!id) {
    return next(new CustomError("userId is required.", 400));
  }

  const order = await Order.find({ placedBy: id });
  if (!order) {
    return next(new CustomError("Order with given user ID not found.", 404));
  }
  // console.log(order);
  res.status(200).json({
    status: "Success",
    data: {
      order,
    },
  });
});

exports.deleteOrder = asyncErrorHandler(async (req, res, next) => {
  const id = req.params?.id;
  if (!id) {
    return next(new CustomError("userId and ordereditems are required.", 400));
  }
  const deletedOrder = await Order.findByIdAndRemove(req.params.id);
  if (!deletedOrder) {
    return next(new CustomError("Order with given ID not found.", 404));
  }
  res.status(202).json({
    status: "Success",
    data: {
      deletedOrder,
    },
  });
});
