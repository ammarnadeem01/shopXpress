const asyncErrorHandler = require('./../Utils/asyncErrorHandler');
const CustomError = require('./../Utils/CustomError');
const Order = require("../Models/orderModel");
exports.placeOrder = async (req, res) => {
  const userId = req.body.placedBy;
  const orderedItems = req.body.orderedItems;
  const { item, quantity } = orderedItems;
  const totalPrice=req.body.totalPrice;
  console.log(totalPrice)
  try {
    const order = await Order.create({
      orderedItems: {
        item,
        quantity,
      },
      placedBy: userId,
      totalPrice:totalPrice
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




exports.getAllOrders = async (req, res) => {
  try {
    const order = await Order.find();
    const totalAmount = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$totalPrice" } 
        }
      }
    ]);
    
    res.status(200).json({
      status: "Success",
      length: order.length,
      totalAmount: totalAmount.length > 0 ? totalAmount[0].totalAmount : 0,
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












exports.getSpecificOrder=async(req,res)=>{
  try {
    const order = await Order.findById(req.params.id);
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
}

exports.updateOrderStatus=async(req,res)=>{
 try {
    const order = await Order.findByIdAndUpdate(req.params.id,{status:req.body.status},{runValidators:true,new:true});
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
}



exports.specificUserOrder=async(req,res)=>{
  try {
     console.log(req.params.id)
     const order = await Order.find({placedBy:req.params.id});
     console.log(order)
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
 }
 

exports.deleteOrder=async(req,res)=>{
  try {
    console.log(req.params.id)
    const deletedOrder = await Order.findByIdAndRemove(req.params.id);
    res.status(202).json({
      status: "Success",
      data: {
        deletedOrder,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
}