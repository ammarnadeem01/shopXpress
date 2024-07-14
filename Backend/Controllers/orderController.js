const asyncErrorHandler = require('./../Utils/asyncErrorHandler');
const CustomError = require('./../Utils/CustomError');
const Order = require("../Models/orderModel");



exports.placeOrder =asyncErrorHandler( async (req, res,next) => {
  const userId = req.body.placedBy;
  const orderedItems = req.body.orderedItems;
  const { item, quantity } = orderedItems;
  const totalPrice=req.body.totalPrice;
  console.log(totalPrice)
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
})




exports.getAllOrders =  asyncErrorHandler( async (req, res,next) => {
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

})












exports.getSpecificOrder=asyncErrorHandler( async(req,res,next)=>{
  
    const order = await Order.findById(req.params.id);
    res.status(200).json({
      status: "Success",
      data: {
        order,
      },
    });

}
)
exports.updateOrderStatus=asyncErrorHandler( async(req,res,next)=>{
 
    const order = await Order.findByIdAndUpdate(req.params.id,{status:req.body.status},{runValidators:true,new:true});
    res.status(200).json({
      status: "Success",
      data: {
        order,
      },
    });
 
}
)


exports.specificUserOrder=asyncErrorHandler( async(req,res,next)=>{
  
     console.log(req.params.id)
     const order = await Order.find({placedBy:req.params.id});
     console.log(order)
     res.status(200).json({
       status: "Success",
       data: {
         order,
       },
     });
  
 })
 

exports.deleteOrder=asyncErrorHandler( async(req,res,next)=>{

    console.log(req.params.id)
    const deletedOrder = await Order.findByIdAndRemove(req.params.id);
    res.status(202).json({
      status: "Success",
      data: {
        deletedOrder,
      },
    });
})