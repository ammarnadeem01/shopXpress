const express = require("express");
const productControllers = require("../Controllers/productController");
const userControllers = require("../Controllers/userController");
const { upload } = require("../Middlewares/multer.middleware");
const router = express.Router();
router
  .route("/admin/products")
  .get(
    userControllers.protect,
    userControllers.restrict("Admin"),
    productControllers.getAllProducts_AdminOnly
  );
router
  .route("/highest-rated-products")
  .get(productControllers.getHighestRated, productControllers.getAllProducts);
// router
//   .route("/admin/")
//   .get(
//     userControllers.protect,
//     userControllers.restrict("Admin"),
//     productControllers.getAllProducts
//   );
router
  .route("/")
  .get(productControllers.getAllProducts)
  .post(
    userControllers.protect,
    userControllers.restrict("Admin"),
    upload.array("productImages", 3),
    productControllers.addNewProduct
  );
// router.route("/admin").get(
//   // userControllers.protect,
//   // userControllers.restrict("Admin"),
//   productControllers.getAllProducts_AdminOnly
// );
router
  .route("/:id")
  .get(productControllers.getSpecificProduct)
  .put(
    userControllers.protect,
    userControllers.restrict("Admin"),
    upload.array("productImages", 3),
    productControllers.updateProduct
  )
  .delete(
    userControllers.protect,
    userControllers.restrict("Admin"),
    productControllers.deleteSpecificProduct
  )
  .patch(
    userControllers.protect,
    userControllers.restrict("Admin"),
    productControllers.stockUpdate
  );
module.exports = router;
