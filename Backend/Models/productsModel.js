const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: [true, "Please Enter product Name"],
    trim: true,
  },
  description: {
    type: String,
    // required: [true, "Please Enter product Description"],
  },
  productImages:[{
      type:String,
  }

  ],
  price: {
    type: Number,
    // required: [true, "Please Enter product Price"],
    maxLength: [8, "Price cannot exceed 8 characters"],
  },
  category: {
    type: String,
    // required: [true, "Please Enter Product Category"],
  },
  stock: {
    type: Number,
    required: [true, "Please Enter product Stock"],
    default: 0,
  },
});

module.exports = mongoose.model("Product", productSchema);
