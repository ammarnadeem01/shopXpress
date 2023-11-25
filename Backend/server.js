const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const mongoose = require("mongoose");
mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch(() => {
    console.log("Database Connection Error");
  });

const port = 3000 || process.env.PORT;
app.listen(port, () => {
  console.log("Server Started");
});
