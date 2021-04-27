const asyncHandler = require("../middlewares/asyncHandler");
const User = require("../models/userModel");
const ErrorResponse = require("../utils/errorResponse");
const jwt = require("jsonwebtoken");

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.cookies.token) {
    token = req.cookies.token;
  }

  //   Make sure token exists
  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }

  try {
    //   Verify token
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);
    req.user = await User.findById(id);
    next();
  } catch (err) {
    return next(new ErrorResponse("Not authorized to access this route"));
  }
});
