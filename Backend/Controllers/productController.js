const asyncErrorHandler = require('./../Utils/asyncErrorHandler');
const CustomError = require('./../Utils/CustomError');
const Product = require("../Models/productsModel");
const uploadOnCloudinary = require("../Utils/cloudinary");

// GetAllProducts
exports.getAllProducts = async (req, res) => {
  try {
    const outOfStockProducts= await Product.aggregate([
      {
        $match: {
          stock:0 
        }
      }
    ]);



    const product = await Product.find();
    res.status(200).json({
      status: "Success",
      length: product.length,
      outOfStockProductsLength:outOfStockProducts.length,
      data: {
        product,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};
//Get-One
exports.getSpecificProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({
      status: "Success",
      length: product.length,
      data: {
        product,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};
//Add-One
exports.addNewProduct = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: error.message,
    });
  }
};


//Update

exports.updateProduct = async (req, res) => {
 
  try {
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
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: error.message,
    });
  }
};

//Delete-One
exports.deleteSpecificProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "Success",
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};
exports.stockUpdate=async(req,res)=>{
  try {
    console.log(req.body.stock)
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id,{stock:req.body.stock},{runValidators:true,new:true});
    res.status(201).json({
      status: "Success",
      data: {
        updatedProduct
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
}
