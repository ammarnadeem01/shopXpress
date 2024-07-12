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

exports.getShippingInfo = async (req, res) => {
    try {
        const id = req.params.id;
        const document = await ShippingInfo.find({ customer: id }).select('address city state country phone');

        if (!document) {
            return res.status(404).json({
                status: "Failure",
                message: "Shipping information not found",
            });
        }

        res.status(200).json({
            status: "Success",
            data: {
                shippingInfo: document,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: "Failure",
            message: error.message,
        });
    }
};
