const asyncErrorHandler = require('./../Utils/asyncErrorHandler');
const CustomError = require('./../Utils/CustomError');
const User = require("../Models/userModel");
const uploadOnCloudinary = require("../Utils/cloudinary")
const jwt = require('jsonwebtoken');
exports.getAllUsers = asyncErrorHandler(async (req, res,next) => {
     const users = await User.find();
     res.status(200).json({
      status: "Success",
      length: users.length,
      data: {
        users,
      },
    });
});


exports.createNewUser = asyncErrorHandler(async (req, res,next) => {
    const {name,email,password}=req.body;
    const avatarLocalPath = req.file.path;
    const avatarui = await uploadOnCloudinary(avatarLocalPath);
    const newUser = await User.create({
      name,password,email,confirmPassword,
      avatar:avatarui.url
    });
    var token = jwt.sign({ id:newUser._id},process.env.SECRET_STR,{ expiresIn: process.env.LOGIN_EXPIRES_IN });
    res.status(201).json({
      status: "Success",
      token,
      data: {
        newUser,
      },
    });
})

exports.getSpecificUser = asyncErrorHandler(async (req, res,next) => {
    const user = await User.findOne({ email: req.params[0] });
    res.status(200).json({
      status: "Success",
      data: {
        user,
      },
    });
})

exports.getSpecificUserWithId = asyncErrorHandler(async (req, res,next) => {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      status: "Success",
      data: {
        user,
      },
    });
});


exports.deleteSpecificUser =asyncErrorHandler( async(req,res,next)=>{
    await User.findByIdAndDelete(req.params.id)
    res.status(202).json(
    {
      status:"Success",
      data:null
    }
    )
})



exports.edituser= asyncErrorHandler(async(req,res,next)=>{
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

})



exports.editProfile= asyncErrorHandler(async(req,res)=>{
  
    const updatedUser = await User.findByIdAndUpdate(req.params.id,req.body.newData,{new:true,runValidators:true});
    res.status(201).json({
            status:"Success",
            data:{
              updatedUser
            }
          })
 
})


















// exports.changePassword=async(req,res)=>{
//   try {
//     const updatedUser = await User.findByIdAndUpdate(req.params.id,{password:newPassword},{new:true,runValidators:true});
//     res.status(201).json({
//       status:"Success",
//       data:{
//         updatedUser
//       }
//     })
    
//   } catch (error) {
//     res.status(404).json({
//       status:"Failure",
//       message:error.message
//     })
    
//   }
// }
