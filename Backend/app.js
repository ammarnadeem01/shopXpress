const express = require("express");
const productRouter = require("./Routes/productRoutes");
const userRouter = require("./Routes/userRoutes");
const orderRouter = require("./Routes/orderRoutes");
const reviewRouter = require("./Routes/reviewRoutes");
const shippingInfoRouter = require("./Routes/shipppingInfoRoutes");

const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/v3/products", productRouter);
app.use("/api/v3/orders", orderRouter);
app.use("/api/v3/users", userRouter);
app.use("/api/v3/reviews", reviewRouter);
app.use("/api/v3/shippinginfo", shippingInfoRouter);
module.exports = app;
