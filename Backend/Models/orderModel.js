const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  orderedItems: [
    {
      item: {
        type: mongoose.Schema.ObjectId,
        ref: "Products",
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  placedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
  },
  placedDate: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Orders", orderSchema);
