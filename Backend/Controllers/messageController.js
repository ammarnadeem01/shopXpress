const Message = require("../Models/messageModel");
const asyncErrorHandler = require("./../Utils/asyncErrorHandler");
const CustomError = require("./../Utils/CustomError");
exports.getAllMessages = asyncErrorHandler(async (req, res, next) => {
  const messages = await Message.find();
  res.status(200).json({
    status: "Success",
    length: messages.length,
    data: {
      messages,
    },
  });
});

exports.addMessage = asyncErrorHandler(async (req, res, next) => {
  const { name, email, message, phoneNumber } = req.body;
  if (!name || !email | !message || !phoneNumber) {
    return next(
      new CustomError(
        "Missing required fields :Name,Email,Message, or PhoneNumber",
        400
      )
    );
  }
  const newMessage = await Message.create({
    name,
    email,
    message,
    phoneNumber,
  });
  res.status(201).json({
    status: "Success",
    data: {
      newMessage,
    },
  });
});

exports.getSpecificMessage = asyncErrorHandler(async (req, res, next) => {
  const message = await Message.findById(req.params.id);
  if (!message) {
    return next(new CustomError("No message found with the given ID.", 404));
  }
  res.status(200).json({
    status: "Success",
    data: {
      message,
    },
  });
});
