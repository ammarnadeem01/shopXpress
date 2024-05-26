const mongoose= require("mongoose")
const shippingInfoSchema = new mongoose.Schema({
    address :{
        type:String,
        required:[true,"Please Enter Address."],
    },
    city:{
        type:String,
        required:[true,"Please Enter City name."], 
    }, 
    country:{
        type:String,
        required:[true,"Please Enter Country name."], 
    }, 
    state:{
        type:String,
        required:[true,"Please Enter State name."], 
    }, 
    pin:{
        type:Number,
        required:[true,"Please Enter Pin Code."], 
    },
    phone:{
        type:String,
        required:[true,"Please Enter Phone Number."], 
    },
    customer:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    }

})
module.exports = mongoose.model("ShippingInfo",shippingInfoSchema)