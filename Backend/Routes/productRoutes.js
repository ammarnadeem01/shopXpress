const express = require("express");
const productControllers = require("../Controllers/productController");
const router = express.Router();
router
  .route("/")
  .get(productControllers.getAllProducts)
  .post(productControllers.addNewProduct);
router
  .route("/:id")
  .get(productControllers.getSpecificProduct)
  .put(productControllers.updateProduct)
  .delete(productControllers.deleteSpecificProduct);
module.exports = router;
