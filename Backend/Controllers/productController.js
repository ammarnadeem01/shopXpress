const Product = require("../Models/productsModel");

// GetAllProducts
exports.getAllProducts = async (req, res) => {
  try {
    const product = await Product.find();
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
    const newProduct = Product.create(req.body);
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
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    res.status(204).json({
      status: "Success",
      data: {
        updatedProduct,
      },
    });
  } catch (error) {
    res.status(404).json({
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
