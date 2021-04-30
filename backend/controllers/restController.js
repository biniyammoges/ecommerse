const asyncHandler = require("../middlewares/asyncHandler");
const Restaurant = require("../models/resturantModel");
const ErrorRespnse = require("../utils/errorResponse");

// @desc Create restaurant
// @route POST /api/v1/restaurant
// @access private
exports.createRestaurant = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;

  const restaurant = await Restaurant.create(req.body);

  res.status(200).json({
    restaurant,
  });
});

// @desc Get all restaurants
// @route GET /api/v1/restaurant
// @access public
exports.getRestaurants = asyncHandler(async (req, res, next) => {
  const restaurants = await Restaurant.find();

  res.status(200).json({
    restaurants,
    count: restaurants.length,
  });
});

// @desc Get single restaurant
// @route GET /api/v1/restaurant/:id
// @access public
exports.getRestaurant = asyncHandler(async (req, res, next) => {
  const restaurant = await Restaurant.findById(req.params.id);

  if (!restaurant) {
    return next(
      new ErrorRespnse(`Restaurant not found with id of ${req.params.id}`)
    );
  }

  res.status(200).json({
    restaurant,
  });
});

// @desc Update restaurant
// @route Put /api/v1/restaurant/:id
// @access private
exports.updateRestaurant = asyncHandler(async (req, res, next) => {
  const restaurant = await Restaurant.findById(req.params.id);

  if (!restaurant) {
    return next(
      new ErrorRespnse(`Restaurant not found with id of ${req.params.id}`)
    );
  }

  restaurant.name = req.body.name || restaurant.name;
  restaurant.isAvailable = req.body.isAvailable || restaurant.isAvailable;

  await restaurant.save();

  res.status(200).json({
    restaurant,
  });
});

// @desc Delete restaurant
// @route DELETE /api/v1/restaurant/:id
// @access private
exports.deleteRestaurant = asyncHandler(async (req, res, next) => {
  const restaurant = await Restaurant.findById(req.params.id);

  if (!restaurant) {
    return next(
      new ErrorRespnse(`Restaurant not found with id of ${req.params.id}`)
    );
  }

  await restaurant.remove();

  res.status(200).json({
    restaurant: {},
  });
});
