const asyncHandler = require("../middlewares/asyncHandler");
const Review = require("../models/reviewModel");
const ErrorRespnse = require("../utils/errorResponse");
const Product = require("../models/productMode");

// @desc Create review
// @route POST /api/v1/product/review/:productId
// @access public
exports.createReview = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.productId);

  if (!product) {
    return next(
      new ErrorRespnse(
        `Product not found with id of ${req.params.productId}`,
        404
      )
    );
  }

  // Prevent user from submitting more than one review
  const reviewed = await Review.find({ user: req.user._id.toString() });

  console.log(`Reviewed - ${reviewed}`);

  const reviewFound = reviewed.find(
    (r) => r.product.toString() === req.params.productId.toString()
  );

  console.log(`already reviewed - ${reviewFound}`);

  if (reviewFound) {
    return next(new ErrorRespnse("Product is already reviewed", 400));
  }

  req.body.user = req.user.id;
  req.body.product = req.params.productId;

  const review = await Review.create(req.body);

  res.status(201).json({
    review,
  });
});

// @desc Get all reviews
// @route GET /api/v1/product/review/:productId
// @access public
exports.getReviews = asyncHandler(async (req, res, next) => {
  const reviews = await Review.find({ product: req.params.productId });

  res.status(200).json({
    count: reviews.length,
    reviews,
  });
});

// @desc Get single reviews
// @route GET /api/v1/review/:id
// @access public
exports.getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(
      new ErrorRespnse(`Review not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    review,
  });
});

// @desc Update reviews
// @route PUT /api/v1/review/:id
// @access public
exports.updateReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(
      new ErrorRespnse(`Review not found with id of ${req.params.id}`, 404)
    );
  }

  if (review.user !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorRespnse(`You are not authorized to update this content`, 401)
    );
  }

  review.text = req.body.text || review.text;
  review.rating = req.body.rating || review.rating;

  await review.save();

  res.status(200).json({
    review,
  });
});

// @desc Delete reviews
// @route Delete /api/v1/review/:id
// @access public
exports.deleteReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(
      new ErrorRespnse(`Review not found with id of ${req.params.id}`, 404)
    );
  }

  if (review.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorRespnse(`You are not authorized to update this content`, 401)
    );
  }

  await review.remove();

  res.status(200).json({
    review: {},
  });
});
