const asyncErrorHandler = require('./../Utils/asyncErrorHandler');
const CustomError = require('./../Utils/CustomError');
const User = require("../Models/userModel");
const uploadOnCloudinary = require("../Utils/cloudinary")
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendMail=require("../Utils/Email")

function signToken(id) {
  return jwt.sign({id},process.env.SECRET_STR,{ expiresIn: process.env.LOGIN_EXPIRES_IN });
}



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
      name,password,email,
      avatar:avatarui.url
    });
    const token = signToken(newUser._id)
    res.status(201).json({
      status: "Success",
      token,
      data: {
        newUser,
      },
    });
})

exports.login = asyncErrorHandler(async (req, res,next) => {

  const {email,password}=req.body;
  if(!email || !password)
  {
    const err=new CustomError("Please enter Email and Password...",400)
    return next(err)
  }
  const user=await User.findOne({email}).select("+password")
  if(!user || !(await user.comparePasswords(password,user.password))) 
  {
    const err=new CustomError("Incorrect Email or Password...",400)
    return next(err)
  }
  const token = signToken(user._id)
  res.status(200).json({
    status: "Success",
    token,
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



exports.editProfile= asyncErrorHandler(async(req,res,next)=>{
  
    const updatedUser = await User.findByIdAndUpdate(req.params.id,req.body.newData,{new:true,runValidators:true});
    res.status(201).json({
            status:"Success",
            data:{
              updatedUser
            }
          })
 
})


exports.protect=asyncErrorHandler(async(req,res,next)=>{
  // Read the token if it exists or not
   const testToken=req.headers.authorization;
   let token;
   if(testToken?.startsWith("Bearer"))
   {
       token = testToken.split(" ")[1];
   }
   if(!token)
   {
     const err=new CustomError("You are not Logged In...",401);
     next(err)
   }

  // validate the token
  const decodedToken=jwt.verify(token,process.env.SECRET_STR)
  // if user exists
  const user = await User.findById(decodedToken.id)
  if(!user)
  {
    next(new CustomError("User with given JWT doesn't exist",401))
  }
  // if the user changed the token after it was issued
  const isPasswordChanged=await  user.isPasswordChanged(decodedToken.iat)
  if(isPasswordChanged)
  {
    next(new CustomError("Password has been changed recently. Please login again.",401))
  }
  // Allow user access to protected route
  req.user=user;
  next()


  }
)







exports.restrict=function (role) {
  return function (req,res,next) {
    if(role!=req.user.role)
    {
      next(new CustomError("You don't have permission to perform this action,",403))
    }
    next()
  }
}


exports.forgotPassword=asyncErrorHandler(async(req,res,next)=>{
  //  1. Findinf user with email
   const email=req.body.email;
   const user = await User.findOne({email})
   if(!user)
   {
    const err=new CustomError(`No user with email ${email} found. Please try again`,403);
    next(err)
   }
  //  2. Generate a token  
   const token=await user.createResetPasswordToken();
   await user.save({validateBeforeSave:false}); // to save the 2 fields in the dbs which we created for token generator function, in function, we only set their values

  //  3. Send token to given email
  const resetUrl= `${req.protocol}://${req.hostname}/api/v3/users/resetPassword/${token}`
  const message=`We have  recieved a Password Reset Request. Please click on the link below to reset password.\n\n${resetUrl}`
  console.log("resetUrl",resetUrl)
  try {
    console.log(1)
    await sendMail({
      email:user.email,
      subject:"Reset Password Request",
      message
    })
    console.log(2)
     res.status(200).json({
      status:"Success",
      message:"Password reset link sent to user."
     })

  } catch (error) {
    user.ResetPasswordToken=undefined
    user.ResetPasswordTokenExpiresIn=undefined
    await user.save({validateBeforeSave:false})
    const err=new CustomError("There was an error sending password reset email. Please try again later.",500)
    return next(err)
  } 










  // try {
  //   console.log(1);
  //   await sendMail({
  //     email: user.email,
  //     subject: "Your password reset token (valid for 10 minutes)",
  //     message,
  //   });
  //   console.log(2);
  //   res.status(200).json({
  //     status: "Success",
  //     message: "Password reset link sent to user.",
  //   });
  // } catch (error) {
  //   user.ResetPasswordToken = undefined;
  //   user.ResetPasswordTokenExpiresIn = undefined;
  //   await user.save({ validateBeforeSave: false }); // Ensure this operation is awaited
  //   const err = new CustomError("There was an error sending the password reset email. Please try again later.", 500);
  //   return next(err); // Ensure we stop execution here
  // }


  
})
exports.resetPassword=asyncErrorHandler(async(req,res,next)=>{
  // check if user exists and token is valid
  const token=req.params.token;
  const encryptedToken=crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({ResetPasswordToken:encryptedToken,ResetPasswordTokenExpiresIn:{$gt:Date.now()}})
  if(!user)
  {
    const err=new CustomError("Token is invalid or has expired",400)
    next(err)
  }

  // reset passwd
   user.password=req.body.password;
   user.ResetPasswordToken=undefined;
   user.ResetPasswordTokenExpiresIn=undefined;
   user.passwordChangedAt=Date.now()
   user.save()

   // automatic login
   const loginToken = signToken(user._id)
   res.status(200).json({
     status: "Success",
     loginToken,
   });

})


exports.updatePassword=asyncErrorHandler(async(req,res,next)=>{
  // get current user data 
  const user = await User.findById(req.user._id).select("+password")
  // check if user exist?
  if(!user)
  {
    next(new CustomError("Email is incorrect..",400))
  }
  // check if passwords match
  const isMatch=await user.comparePasswords(req.body.currentPassword,user.password)
  if(!isMatch)
  {
    next(new CustomError("The current password you provided is wrong",401))
  }
  
  // update passwd
  user.password=req.body.newPassword
  await user.save()


  // login
  const loginToken = signToken(user._id)
  res.status(200).json({
    status: "Success",
    loginToken,
    data:{
      user
    }
  });

})


