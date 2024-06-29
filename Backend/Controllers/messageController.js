const Message = require("../Models/messageModel");
const asyncErrorHandler = require('./../Utils/asyncErrorHandler');
const CustomError = require('./../Utils/CustomError');
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await User.find();
    res.status(200).json({
      status: "Success",
      length: messages.length,
      data: {
        messages,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};
exports.addMessage = async (req, res) => {
  try {
    const newMessage = await Message.create(req.body)
    res.status(201).json({
      status: "Success",
      data: {
        newMessage,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      error,
      message: error.message,
    });
  }
};

exports.getSpecificMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    res.status(200).json({
      status: "Success",
      data: {
        message,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};
