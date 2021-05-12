const asyncHandler = require("../middlewares/asyncHandler");
const Order = require("../models/orderModel");
const User = require("../models/userModel");
const ErrorRespnse = require("../utils/errorResponse");

// @desc Get orders by user
// @route GET /api/v1/orders
// @access private/user/admin
exports.getMyOrders = asyncHandler(async (req, res, next) => {
  let orders;

  // Get all orders for admin
  if (req.user.role === "admin" || req.user.role === "delivery") {
    orders = await Order.find({}).populate("user", "name email");
  }

  // Get user order for user
  orders = await Order.find({ user: req.user.id }).populate(
    "user",
    "name email"
  );

  res.status(200).json({
    count: orders.length,
    orders,
  });
});

// @desc Get single order
// @route GET /api/v1/orders/:id
// @access private/admin
exports.getOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(
      new ErrorRespnse(`Order not found with id 0f ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    order,
  });
});

// @desc Get single order
// @route GET /api/v1/orders/:id
// @access private/admin
exports.updateOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(
      new ErrorRespnse(`Order not found with id 0f ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    order,
  });
});

// @desc Create order
// @route POST /api/v1/orders
// @access private
exports.createOrder = asyncHandler(async (req, res, next) => {
  const { orderItems, shippingAddress, itemsPrice, totalPrice } = req.body;

  if (orderItems && orderItems.length === 0) {
    return next(new ErrorRespnse(`No ordered items`, 400));
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      taxPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json({ order: createdOrder });
  }
});
