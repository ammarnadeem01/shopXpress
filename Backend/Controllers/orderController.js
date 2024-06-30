const asyncErrorHandler = require('./../Utils/asyncErrorHandler');
const CustomError = require('./../Utils/CustomError');
const Order = require("../Models/orderModel");
exports.placeOrder = async (req, res) => {
  const userId = req.body.userId;
  const orderedItems = req.body.orderedItems;
  const { item, quantity } = orderedItems;
  try {
    const order = await Order.create({
      orderedItems: {
        item,
        quantity,
      },
      placedBy: userId,
    });
    res.status(200).json({
      status: "Success",
      data: {
        order,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};

exports.getAllOrders=async(req,res)=>{
  try {
    const order = await Order.find();
    res.status(200).json({
      status: "Success",
      length: order.length,
      data: {
        order,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
}
