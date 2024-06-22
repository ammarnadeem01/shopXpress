const User = require("../Models/userModel");
const uploadOnCloudinary = require("../Utils/cloudinary")
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "Success",
      length: users.length,
      data: {
        users,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};
exports.createNewUser = async (req, res) => {
  try {
    const {name,email,password}=req.body;
    const avatarLocalPath = req.file.path;
    const avatarui = await uploadOnCloudinary(avatarLocalPath);
    const newUser = await User.create({
      name,password,email,
      avatar:avatarui.url
    });
    res.status(201).json({
      status: "Success",
      data: {
        newUser,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      error,
      message: error,
    });
  }
};
exports.getSpecificUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    res.status(200).json({
      status: "Success",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};

exports.getSpecificUserWithId = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      status: "Success",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};
