const asyncErrorHandler = require("./../Utils/asyncErrorHandler");
const CustomError = require("./../Utils/CustomError");
const Product = require("../Models/productsModel");
const uploadOnCloudinary = require("../Utils/cloudinary");
const ApiFeatures = require("../Utils/ApiFeatures");

exports.getHighestRated = (req, res, next) => {
  req.query.limit = "8";
  req.query.sort = "-avgRating";

  next();
};

// Get All Products - For Admin - Without Filters
exports.getAllProducts_AdminOnly = asyncErrorHandler(async (req, res, next) => {
  const products = await Product.find();
  console.log("admin products endpoint hit");
  res.status(200).json({
    status: "Success",
    data: {
      products,
    },
  });
});
// GetAllProducts
exports.getAllProducts = asyncErrorHandler(async (req, res, next) => {
  const outOfStockProducts = await Product.aggregate([
    {
      $match: {
        stock: 0,
      },
    },
  ]);

  const prodlength = await Product.countDocuments();

  let features = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .sort();
  let queryWithoutPagination = features.query.clone();

  let filteredProductsCount = await queryWithoutPagination.countDocuments();

  features.paginate();
  let product = await features.query;

  res.status(200).json({
    status: "Success",
    length: prodlength,
    filteredProductsCount,
    outOfStockProductsLength: outOfStockProducts.length,
    data: {
      product,
    },
  });
});

// Get Specific Product
exports.getSpecificProduct = asyncErrorHandler(async (req, res, next) => {
  if (!req.params.id) {
    return next(new CustomError("Id is required..", 400));
  }
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new CustomError("No product found with the given ID.", 404));
  }
  res.status(200).json({
    status: "Success",
    data: {
      product,
    },
  });
});

//Add-One
exports.addNewProduct = asyncErrorHandler(async (req, res, next) => {
  const { name, description, price, category, stock } = req.body;
  if (!name || !description || !price || !category || stock == null) {
    return next(
      new CustomError(
        "Missing required fields: name, description, price, category, or stock.",
        400
      )
    );
  }

  if (!req.files || req.files.length < 3) {
    return next(new CustomError("At least 3 images are required.", 400));
  }
  const image1LocalePath = req.files[0].path;
  const image2LocalePath = req.files[1].path;
  const image3LocalePath = req.files[2].path;
  const img1 = await uploadOnCloudinary(image1LocalePath);
  const img2 = await uploadOnCloudinary(image2LocalePath);
  const img3 = await uploadOnCloudinary(image3LocalePath);
  const newProduct = await Product.create({
    name,
    description,
    price,
    category,
    stock,
    productImages: [img1.url, img2.url, img3.url],
  });
  res.status(201).json({
    status: "Success",
    data: {
      newProduct,
    },
  });
});

//Update

exports.updateProduct = asyncErrorHandler(async (req, res, next) => {
  const { name, description, price, category, stock } = req.body;
  const { id } = req.params;

  if (!name || !description || !price || !category || stock == null) {
    return next(
      new CustomError(
        "Missing required fields: name, description, price, category, or stock.",
        400
      )
    );
  }

  const existingProduct = await Product.findById(id);
  if (!existingProduct) {
    return next(new CustomError("No product found with the given ID.", 404));
  }

  if (!req.files || req.files.length < 3) {
    return next(new CustomError("At least 3 images are required.", 400));
  }
  const image1LocalePath = req.files[0].path;
  const image2LocalePath = req.files[1].path;
  const image3LocalePath = req.files[2].path;
  const img1 = await uploadOnCloudinary(image1LocalePath);
  const img2 = await uploadOnCloudinary(image2LocalePath);
  const img3 = await uploadOnCloudinary(image3LocalePath);
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      price,
      category,
      stock,
      productImages: [img1.url, img2.url, img3.url],
    },
    { new: true, runValidators: true }
  );
  res.status(201).json({
    status: "Success",
    data: {
      updatedProduct,
    },
  });
});

//Delete-One
exports.deleteSpecificProduct = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    return next(new CustomError("No product found with the given ID.", 404));
  }
  await Product.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "Success",
    data: null,
  });
});
// Update Stock
exports.stockUpdate = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const { stock } = req.body;

  if (stock == null) {
    return next(new CustomError("Stock value is required.", 400));
  }

  const existingProduct = await Product.findById(id);
  if (!existingProduct) {
    return next(new CustomError("No product found with the given ID.", 404));
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    { stock },
    { runValidators: true, new: true }
  );
  res.status(200).json({
    status: "Success",
    data: {
      updatedProduct,
    },
  });
});
