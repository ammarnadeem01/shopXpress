const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "Please Enter Your Confirm Password"],
    validate: {
      validator: function (value) {
        console.log(`Validator: ${value} === ${this.password}`); // Debugging line
        return value === this.password;
      },
      message: "Password and Confirm Passwords don't match",
    },
  },
  passwordChangedAt: Date,
  ResetPasswordToken: String,
  ResetPasswordTokenExpiresIn: Date,
  active: {
    type: Boolean,
    required: true,
    default: true,
  },
  avatar: {
    type: String,
  },
  role: {
    type: String,
    default: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("find", function (next) {
  this.find({ active: true });
  next();
});

userSchema.pre("save", async function (next) {
  // console.log(1);
  if (!this.isModified("password")) return next();

  // Encrypting password before it is saved
  console.log(`Hashing password: ${this.password}`); // Debugging line
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.comparePasswords = async function (passwd, dbPasswd) {
  return await bcrypt.compare(passwd, dbPasswd);
};

userSchema.methods.isPasswordChanged = async function (JwtTimestamp) {
  if (this.passwordChangedAt) {
    const passwordChangedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return passwordChangedTimeStamp > JwtTimestamp;
  }
  return false;
};

userSchema.methods.createResetPasswordToken = async function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.ResetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.ResetPasswordTokenExpiresIn = Date.now() + 10 * 60 * 1000; // (10 minutes into ms)
  console.log("ResetPasswordToken", this.ResetPasswordToken);
  console.log("ResetPasswordTokenExpiresIn", this.ResetPasswordTokenExpiresIn);
  return resetToken; // we excrypt password for db but send simple token to user
};

const User = mongoose.model("User", userSchema);

module.exports = User;
