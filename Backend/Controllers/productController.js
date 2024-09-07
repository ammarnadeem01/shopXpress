const asyncErrorHandler = require("./../Utils/asyncErrorHandler");
const CustomError = require("./../Utils/CustomError");
const Product = require("../Models/productsModel");
const { uploadToCloudinary } = require("../Middlewares/multer.middleware.js");
const ApiFeatures = require("../Utils/ApiFeatures");

exports.getHighestRated = (req, res, next) => {
  req.query.limit = "8";
  req.query.sort = "-avgRating";

  next();
};

// Get All Products - For Admin - Without Filters
exports.getAllProducts_AdminOnly = asyncErrorHandler(async (req, res, next) => {
  const products = await Product.find();
  // console.log("admin products endpoint hit");
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

  let imageUrls = [];
  try {
    for (const file of req.files) {
      const result = await uploadToCloudinary(file.buffer);
      imageUrls.push(result.secure_url);
    }

    if (imageUrls.length < 3) {
      return next(new CustomError("Failed to upload all images.", 400));
    }

    const newProduct = await Product.create({
      name,
      description,
      price,
      category,
      stock,
      productImages: imageUrls,
    });

    if (!newProduct) {
      return next(new CustomError("Product creation failed.", 500));
    }

    res.status(201).json({
      status: "Success",
      data: {
        newProduct,
      },
    });
  } catch (error) {
    console.error("Failed to upload images to Cloudinary:", error);
    return next(new CustomError("Failed to upload images to Cloudinary.", 500));
  }
});

//Update

exports.updateProduct = asyncErrorHandler(async (req, res, next) => {
  // console.log("req.body", req.body);
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
  const updatedData = { name, description, price, category, stock };
  // console.log("req.files", req.files);
  if (req.files.length > 0) {
    if (req.files.length < 3) {
      return next(new CustomError("At least 3 images are required.", 400));
    }

    const imageUrls = [];
    try {
      for (const file of req.files) {
        if (!file.buffer) {
          throw new Error("File buffer is missing.");
        }
        const result = await uploadToCloudinary(file.buffer);
        imageUrls.push(result.secure_url);
      }

      if (imageUrls.length < 3) {
        return next(new CustomError("Failed to upload all images.", 400));
      }

      updatedData.productImages = imageUrls;
    } catch (error) {
      console.error("Failed to upload images to Cloudinary:", error);
      return next(
        new CustomError("Failed to upload images to Cloudinary.", 500)
      );
    }
  }

  // console.log("updatedData", updatedData);
  const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  });
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
