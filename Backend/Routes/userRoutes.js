const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");
router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createNewUser);
router.route("/:email").get(userController.getSpecificUser);
// .put(userController.updateUser);
module.exports = router;
