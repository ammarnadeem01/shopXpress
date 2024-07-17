const express = require("express");
const router = express.Router();
const upload = require("../Middlewares/multer.middleware")
const userControllers = require("../Controllers/userController");


router
  .route("/")
    .get(userControllers.protect,userControllers.getAllUsers)
    .post(upload.single('avatar'),userControllers.createNewUser);
router
  .route("/forgotpassword")
    .post(userControllers.forgotPassword);
router
  .route("/resetpassword/:token")
    .patch(userControllers.resetPassword)  
router
  .route("/login")
    .get(userControllers.login) ;
router
  .route("/updatePassword")
    .patch(userControllers.protect,userControllers.updatePassword)     
router 
  .route("/:id")
    .get(userControllers.getSpecificUserWithId)
    .delete(userControllers.protect,userControllers.restrict("Admin"),userControllers.deleteSpecificUser)
    .patch(userControllers.editProfile)

module.exports = router;
