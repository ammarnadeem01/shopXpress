const express = require("express");
const router = express.Router();
const upload = require("../Middlewares/multer.middleware")
const userControllers = require("../Controllers/userController");
router
  .route("/")
  .get(userControllers.getAllUsers)
  .post(upload.single('avatar'),userControllers.createNewUser);
  router.get(/^\/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/, (req, res, next) => {
    req.params.email = req.params[0];
    userControllers.getSpecificUser(req, res, next);
  });
  router.patch(/^\/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/, (req, res, next) => {
    req.params.email = req.params[0];
    userControllers.edituser(req, res, next);
  });
  router 
    .route("/:id")
    .get(userControllers.getSpecificUserWithId)
    .delete(userControllers.deleteSpecificUser)
module.exports = router;
