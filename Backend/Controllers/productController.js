const asyncErrorHandler = require('./../Utils/asyncErrorHandler');
const CustomError = require('./../Utils/CustomError');
const Product = require("../Models/productsModel");
const uploadOnCloudinary = require("../Utils/cloudinary");
const ApiFeatures = require("../Utils/ApiFeatures")
// GetAllProducts
exports.getAllProducts = asyncErrorHandler( async (req, res,next) => {
    const outOfStockProducts= await Product.aggregate([
      {
        $match: {
          stock:0 
        }
      }
    ]);
    // const product = await Product.find();
    const features = new ApiFeatures(Movie.find(), req.query)
    .sort()
    .paginate();
    let product = await features.query; 
    res.status(200).json({
      status: "Success",
      length: product.length,
      outOfStockProductsLength:outOfStockProducts.length,
      data: {
        product,
      },
    });
})
//Get-One
exports.getSpecificProduct =asyncErrorHandler( async (req, res,next) => {
    const product = await Product.findById(req.params.id);
    res.status(200).json({
      status: "Success",
      length: product.length,
      data: {
        product,
      },
    });
});
//Add-One
exports.addNewProduct =asyncErrorHandler( async (req, res,next) => {
    const {name,description,price,category,stock}=req.body;
    const image1LocalePath = req.files[0].path;
    const image2LocalePath = req.files[1].path;
    const image3LocalePath = req.files[2].path;
    const img1=await uploadOnCloudinary(image1LocalePath)
    const img2=await uploadOnCloudinary(image2LocalePath)
    const img3=await uploadOnCloudinary(image3LocalePath)
    const newProduct=await Product.create({
      name,description,price,category,stock,
      productImages:[img1.url,img2.url,img3.url]
    })
    res.status(201).json({
      status: "Success",
      data: {
        newProduct,
      },
    });
});


//Update

exports.updateProduct = asyncErrorHandler(async (req, res,next) => {
    console.log("req.params.id",req.params.id)
    console.log("req.body",req.body)
    const {name,description,price,category,stock}=req.body;
    const image1LocalePath = req.files[0].path;
    const image2LocalePath = req.files[1].path;
    const image3LocalePath = req.files[2].path;
    const img1=await uploadOnCloudinary(image1LocalePath)
    const img2=await uploadOnCloudinary(image2LocalePath)
    const img3=await uploadOnCloudinary(image3LocalePath)
    const updatedProduct=await Product.findByIdAndUpdate(req.params.id,{
      name,description,price,category,stock,
      productImages:[img1.url,img2.url,img3.url]
    }, { new: true, runValidators: true })
    res.status(201).json({
      status: "Success",
      data: {
        updatedProduct,
      },
    });
});

//Delete-One
exports.deleteSpecificProduct =asyncErrorHandler( async (req, res,next) => {
    await Product.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "Success",
      data: null,
    });
 
});
exports.stockUpdate=asyncErrorHandler(async(req,res,next)=>{
    console.log(req.body.stock)
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id,{stock:req.body.stock},{runValidators:true,new:true});
    res.status(201).json({
      status: "Success",
      data: {
        updatedProduct
      },
    });
})
