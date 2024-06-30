const express = require("express");
const productControllers = require("../Controllers/productController");
const upload = require("../Middlewares/multer.middleware");
const router = express.Router();
router
  .route("/")
  .get(productControllers.getAllProducts)
  .post(upload.array('productImages',3),productControllers.addNewProduct);
router
  .route("/:id")
  .get(productControllers.getSpecificProduct)
  .put(upload.array('productImages',3),productControllers.updateProduct)
  .delete(productControllers.deleteSpecificProduct);
module.exports = router;
