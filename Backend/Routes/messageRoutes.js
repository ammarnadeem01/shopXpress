const express = require("express");
const router = express.Router();
const messageControllers = require("../Controllers/messageController");
router
  .route("/")
  .get(messageControllers.getAllMessages)
  .post(messageControllers.addMessage);
router.route("/:id").get(messageControllers.getSpecificMessage);
module.exports = router;
