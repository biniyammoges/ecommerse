const asyncHandler = require("../middlewares/asyncHandler");
const User = require("../models/userModel");
const ErrorRespnse = require("../utils/errorResponse");

// @desc get all users for admin
// @route GET /api/v1/users
// @access private/admin
exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({});

  res.status(200).json({
    data: users,
    count: users.length,
  });
});

// @desc get single user for admin
// @route GET /api/v1/users/:id
// @access private/admin
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorRespnse(`User not found with id of ${req.params.id}`));
  }

  res.status(200).json({
    data: user,
  });
});

// @desc Update user admin
// @route PUT /api/v1/users/:id
// @access private/admin
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorRespnse(`User not found with id of ${req.params.id}`));
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.username = req.body.username || user.username;
  user.gender = req.body.gender || user.gender;

  await user.save();

  res.status(200).json({
    data: user,
  });
});

// @desc Delete user admin
// @route DELETE /api/v1/users/:id
// @access private/admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorRespnse(`User not found with id of ${req.params.id}`));
  }

  user.remove();

  res.status(200).json({
    data: {},
  });
});
