const express = require("express");
const router = express.Router();
const userControllers = require("../Controllers/userController");
router
  .route("/")
  .get(userControllers.getAllUsers)
  .post(userControllers.createNewUser);
  router 
    .route("/:id")
    .get(userControllers.getSpecificUserWithId);
router
  .route("/:email")
  .get(userControllers.getSpecificUser);
module.exports = router;
