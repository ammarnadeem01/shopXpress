const express = require("express");
const productRouter = require("./Routes/productRoutes");
const userRouter = require("./Routes/userRoutes");
const orderRouter = require("./Routes/orderRoutes");
const reviewRouter = require("./Routes/reviewRoutes");
const shippingInfoRouter = require("./Routes/shipppingInfoRoutes");
const messageRouter = require("./Routes/messageRoutes");
const CustomError = require("./Utils/CustomError");
const globalErrorHandler = require("./Controllers/authControllers")
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("Public"));
app.use(cors());
app.use("/api/v3/products", productRouter);
app.use("/api/v3/orders", orderRouter);
app.use("/api/v3/users", userRouter);
app.use("/api/v3/reviews", reviewRouter);
app.use("/api/v3/shippinginfo", shippingInfoRouter);
app.use("/api/v3/message", messageRouter);
app.all('*', (req, res, next) => {
    const err = new CustomError(`Can't find ${req.originalUrl} on the server!`, 404);
    next(err);
});

app.use(globalErrorHandler);

module.exports = app;
