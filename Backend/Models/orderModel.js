const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  orderedItems: [
    {
      item: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  placedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    default: "Processing",
  },
  totalPrice: {
    type: Number,
    default: 0,
  },
  placedDate: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Order", orderSchema);
