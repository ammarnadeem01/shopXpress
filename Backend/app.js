const express = require("express");
const hpp = require("hpp"); // http paramter pollution
// const rateLimit = require("express-rate-limit"); // limited no of req
const sanitize = require("express-mongo-sanitize"); // sanitize for hacker attacks- nosql query
const xss = require("xss-clean"); // sanitize for hacker attacks- html
const helmet = require("helmet"); //  security headers

const productRouter = require("./Routes/productRoutes");
const userRouter = require("./Routes/userRoutes");
const orderRouter = require("./Routes/orderRoutes");
const reviewRouter = require("./Routes/reviewRoutes");
const shippingInfoRouter = require("./Routes/shipppingInfoRoutes");
const messageRouter = require("./Routes/messageRoutes");
const CustomError = require("./Utils/CustomError");
const globalErrorHandler = require("./Controllers/errorControllers");
const cors = require("cors");

const app = express();

app.use(helmet());
// let limtier = rateLimit({
//   max: 100000, // max no of req from particular ip
//   windowMs: 60 * 60 * 1000, // within time in ms
//   message:
//     "We have received too many requests from this ip. Please try again later.",
// });
// app.use("/api", limtier);

// app.use(express.json({ limit: "10kb" }));
app.use(express.json());

app.use(sanitize());
app.use(xss());
// app.use(hpp({whitelist:''})) we can provide mustasna parameters in whiteList

// app.use(cors());
app.use(
  cors({
    // origin: "http://localhost:5173",
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    // allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.static("Public"));
app.use("/api/v3/products", productRouter);
app.use("/api/v3/orders", orderRouter);
app.use("/api/v3/users", userRouter);
app.use("/api/v3/reviews", reviewRouter);
app.use("/api/v3/shippinginfo", shippingInfoRouter);
app.use("/api/v3/message", messageRouter);
app.all("*", (req, res, next) => {
  const err = new CustomError(
    `Can't find ${req.originalUrl} on the server!`,
    404
  );
  next(err);
});
app.use(globalErrorHandler);
module.exports = app;
