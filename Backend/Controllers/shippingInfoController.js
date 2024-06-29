const asyncErrorHandler = require('./../Utils/asyncErrorHandler');
const CustomError = require('./../Utils/CustomError');
const ShippingInfo = require("../Models/shippingInfoModel")
exports.addShippingInfo=async (req,res)=>{
     try {
        const newShippingInfo=await ShippingInfo.create(req.body);
        res.status(201).json({
            status:"Success",
            data:{
                newShippingInfo,
            }
        })
     } catch (error) {
        res.status(404).json({
            status:"Failue",
            message:error.message,
        })
     }
}

exports.getShippingInfo = (req, res) => {
    const id = req.params.id;

    ShippingInfo.findById(id)
        .select('address city state country')
        .then((document) => {
            if (!document) {
                // If no document is found, send a 404 response
                return res.status(404).json({
                    status: "Failure",
                    message: "Shipping information not found",
                });
            }

            // If a document is found, send a success response
            return res.status(200).json({
                status: "Success",
                data: {
                    shippingInfo: document,
                },
            });
        })
        .catch((error) => {
            return res.status(500).json({
                status: "Failure",
                message: error.message
            });
        });
};
