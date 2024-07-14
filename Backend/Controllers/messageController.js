const Message = require("../Models/messageModel");
const asyncErrorHandler = require('./../Utils/asyncErrorHandler');
const CustomError = require('./../Utils/CustomError');
exports.getAllMessages = asyncErrorHandler(async (req, res,next) => {

    const messages = await User.find();
    res.status(200).json({
      status: "Success",
      length: messages.length,
      data: {
        messages,
      },
    });

})
exports.addMessage = asyncErrorHandler( async (req, res,next) => {
    const newMessage = await Message.create(req.body)
    res.status(201).json({
      status: "Success",
      data: {
        newMessage,
      },
    });
})

exports.getSpecificMessage =asyncErrorHandler( async (req, res,next) => {
    const message = await Message.findById(req.params.id);
    res.status(200).json({
      status: "Success",
      data: {
        message,
      },
    });
 
})
