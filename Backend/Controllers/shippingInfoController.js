const asyncErrorHandler = require('./../Utils/asyncErrorHandler');
const CustomError = require('./../Utils/CustomError');
const ShippingInfo = require("../Models/shippingInfoModel")
exports.addShippingInfo=asyncErrorHandler(async (req,res,next)=>{
    if(req?.body)
    {
        next(new CustomError("Shipping Info is required...",400))
    }
    const newShippingInfo=await ShippingInfo.create(req.body);
    if(newShippingInfo)
        {
            next(new CustomError("",400))
        }
    res.status(201).json({
        status:"Success",
        data:{
            newShippingInfo,
        }
    })
})

exports.getShippingInfo = asyncErrorHandler(async (req, res,next) => {
        const id = req.params.id;
        if(!id)
        {
            next(new CustomError("ID is required...",400))
        }
        const document = await ShippingInfo.find({ customer: id }).select('address city state country phone');

        if (!document) {
           next(new CustomError("Shipping Info not found",404))
        }

        res.status(200).json({
            status: "Success",
            data: {
                shippingInfo: document,
            },
        });

})