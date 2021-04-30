const asyncHandler = require("../middlewares/asyncHandler");
const Category = require("../models/categoryModel");
const ErrorRespnse = require("../utils/errorResponse");

// @desc Get all categories
// @route GET /api/v1/category
// @access public
exports.getCategories = asyncHandler(async (req, res, next) => {
  const categories = await Category.find({}).populate({
    path: "products",
    select: "name, description, price, rating, image",
  });

  res.status(200).json({
    categories,
    count: categories.length,
  });
});

// @desc Create category
// @route GET /api/v1/category
// @access private/admin
exports.createCategory = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;

  const category = await Category.create(req.body);

  res.status(200).json({
    category,
  });
});

// @desc Get category
// @route GET /api/v1/category/:id
// @access public
exports.getCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id).populate({
    path: "products",
    select: "name, description, price, rating, image",
  });

  if (!category) {
    return next(
      new ErrorRespnse(`Categoy not found with id of ${req.params.id}`)
    );
  }

  res.status(200).json({
    category,
  });
});

// @desc Update categorie
// @route PUT /api/v1/category/:id
// @access private/admin
exports.updateCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(
      new ErrorRespnse(`Categoy not found with id of ${req.params.id}`)
    );
  }

  category.name = req.body.name || category.name;
  category.type = req.body.type || category.type;

  await category.save();

  res.status(200).json({
    category,
  });
});

// @desc Delete categorie
// @route DELETE /api/v1/category/:id
// @access private/admin
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(
      new ErrorRespnse(`Categoy not found with id of ${req.params.id}`)
    );
  }

  category.remove();

  res.status(200).json({
    category: {},
  });
});
