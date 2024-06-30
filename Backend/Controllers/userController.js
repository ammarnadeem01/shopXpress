const asyncErrorHandler = require('./../Utils/asyncErrorHandler');
const CustomError = require('./../Utils/CustomError');
const User = require("../Models/userModel");
const uploadOnCloudinary = require("../Utils/cloudinary")
exports.getAllUsers = asyncErrorHandler(async (req, res) => {
     const users = await User.find();
     res.status(200).json({
      status: "Success",
      length: users.length,
      data: {
        users,
      },
    });
});
exports.createNewUser = asyncErrorHandler(async (req, res) => {
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
})

exports.getSpecificUser = asyncErrorHandler(async (req, res) => {
    const user = await User.findOne({ email: req.params[0] });
    res.status(200).json({
      status: "Success",
      data: {
        user,
      },
    });
})

exports.getSpecificUserWithId = asyncErrorHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      status: "Success",
      data: {
        user,
      },
    });
});


exports.deleteSpecificUser = async(req,res)=>{
  try {
    await User.findByIdAndDelete(req.params.id)
    res.status(202).json(
    {
      status:"Success",
      data:null
     }
    )
  } catch (error) {
     res.status(404).json({
      status:"Fail",
      message:error.message
     })
  }
}


exports.edituser=async(req,res)=>{
  try {
    console.log("req.body.role",req.body.role)
    console.log(req.params[0])
    const updatedUser = await User.findOneAndUpdate({ email: req.params[0] },{
      $set: { role: req.body.role}
    },
    { new: true, runValidators: true } 
  )
    res.status(200).json(
    {
      status:"Success",
      data:updatedUser
     }
    )
  } catch (error) {
     res.status(404).json({
      status:"Fail",
      message:error.message
     })
  } 
}
