const express=require("express")
const router=express.Router();
const shippingInfoControllers=require("../Controllers/shippingInfoController");
router.route("/").post(shippingInfoControllers.addShippingInfo);
router.route("/:id").get(shippingInfoControllers.getShippingInfo)

module.exports = router;