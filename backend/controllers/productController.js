const path = require("path");
const fs = require("fs");
const asyncHandler = require("../middlewares/asyncHandler");
const Product = require("../models/productMode");
const ErrorRespnse = require("../utils/errorResponse");

// @desc Get all products
// @route GET /api/v1/products
// @access public
exports.getProducts = asyncHandler(async (req, res, next) => {
  let query;

  // copy req query
  const reqQuery = { ...req.query };

  const removeFields = ["select", "limit", "sort", "page"];

  // fields to exclude
  removeFields.forEach((param) => delete reqQuery[param]);

  // parse query into string
  let queryStr = JSON.stringify(reqQuery);

  // replace gte to $gte
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  // Finding the resource
  query = Product.find(JSON.parse(queryStr));

  // Select fields
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  // sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  // pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 2;
  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit);

  const products = await query;

  res.status(200).json({
    products,
    count: products.length,
  });
});

// @desc Create product
// @route POST /api/v1/products
// @access private/admin
exports.createProduct = asyncHandler(async (req, res, next) => {
  // Add user to product
  req.body.user = req.user;

  if (!req.files) {
    return next(new ErrorRespnse("Please add product image", 404));
  }

  const file = req.files.file;

  // check for image type
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorRespnse("Please upload an image file", 400));
  }

  // check for file size
  if (file.size > process.env.MAX_PHOTO_SIZE) {
    return next(
      new ErrorRespnse("File size is too big,pls upload less than 1mb size")
    );
  }

  // create custom image name
  file.name = `product_${file.name}`;

  req.body.image = `/uploads/products/${file.name}`;

  file.mv(`${process.env.PRODUCT_FILE_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.log(err);
      return next(new ErrorRespnse("Problem with product file upload", 400));
    }

    const product = await Product.create(req.body);

    return res.status(201).json({
      product,
    });
  });
});

// @desc Get single product by id
// @route GET /api/v1/products/:id
// @access public
exports.getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorRespnse(`Product not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    product,
  });
});

// @desc Update product by id
// @route PUT /api/v1/products/:id
// @access private/admin
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorRespnse(`Product not found with id of ${req.params.id}`, 404)
    );
  }

  product.name = req.body.name || product.name;
  product.description = req.body.description || product.description;
  product.price = req.body.price || product.price;

  if (req.files) {
    const file = req.files.file;

    // check for image type
    if (!file.mimetype.startsWith("image")) {
      return next(new ErrorRespnse("Please upload an image file", 400));
    }

    // check for size
    if (file.size > process.env.MAX_PHOTO_SIZE) {
      return next(
        new ErrorRespnse("File size is too big, pls upload less than 1mb size")
      );
    }

    // create custom image name
    file.name = `product_${file.name}`;

    req.body.image = `/uploads/products/${file.name}`;

    file.mv(`${process.env.PRODUCT_FILE_PATH}/${file.name}`, async (err) => {
      if (err) {
        return next(new ErrorRespnse("Problem with product file upload", 400));
      }

      fs.unlinkSync(`${process.env.FILE_PATH}${product.image}`);

      product.image = req.body.image;
      await product.save();

      res.status(200).json({
        product,
      });
    });
  } else {
    await product.save();

    res.status(200).json({
      product: await Product.findById(req.params.id),
    });
  }
});

// @route PUT /api/v1/products/:id
// @access private/admin
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorRespnse(`Product not found with id of ${req.params.id}`, 404)
    );
  }

  fs.unlinkSync(`${process.env.FILE_PATH}${product.image}`);

  await product.remove();

  res.status(200).json({
    product: {},
  });
});

// @desc Get top rated products
// @route GET /api/v1/products/top
// @access public
exports.getTopRated = asyncHandler(async (req, res, next) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(5);

  res.status(200).json({
    products,
  });
});
