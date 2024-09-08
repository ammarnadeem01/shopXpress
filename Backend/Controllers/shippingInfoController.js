const asyncErrorHandler = require("./../Utils/asyncErrorHandler");
const CustomError = require("./../Utils/CustomError");
const ShippingInfo = require("../Models/shippingInfoModel");
const { default: mongoose } = require("mongoose");
exports.addShippingInfo = asyncErrorHandler(async (req, res, next) => {
  if (!req?.body) {
    return next(new CustomError("Shipping Info is required...", 400));
  }
  const { address, pin, state, country, city, phone, customer } = req.body;
  if (!address || !pin || !state || !country || !city || !phone || !customer) {
    return next(
      new CustomError(
        "Missing Required Fields : Address, PIN, State, City, Country, Phone",
        400
      )
    );
  }
  // console.log(req.body);
  const newShippingInfo = await ShippingInfo.create({
    address,
    city,
    state,
    country,
    pin,
    phone,
    customer,
  });
  // if (!newShippingInfo) {
  //   next(new CustomError("", 400));
  // }
  res.status(201).json({
    status: "Success",
    data: {
      newShippingInfo,
    },
  });
});

exports.getShippingInfo = asyncErrorHandler(async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return next(new CustomError("ID is required...", 400));
  }
  const document = await ShippingInfo.findOne({ customer: id })
    .sort({ createdAt: -1 })
    .select("address city state country phone");

  if (!document) {
    return next(new CustomError("Shipping Info not found", 404));
  }

  res.status(200).json({
    status: "Success",
    data: {
      shippingInfo: document,
    },
  });
});
