const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
// process.on("uncaughtException", () => {
//   process.exit(1);
// });
const app = require("./app");
const mongoose = require("mongoose");
mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    socketTimeoutMS: 45000,
    connectTimeoutMS: 45000,
  })
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch(() => {
    console.log("Database Connection Error");
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server Started");
});

// process.on("unhandledRejection", () => {
//   server.close(() => {
//     process.exit(1);
//   });
// });
