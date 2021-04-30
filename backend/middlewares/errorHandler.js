const ErrorResponse = require("../utils/errorResponse");

exports.notFound = (req, res, next) => {
  next(
    new ErrorResponse(
      `Route not found - ${req.method} - ${req.originalUrl}`,
      404
    )
  );
};

exports.errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  // Mongoose bad objectid
  if (err.name === "CastError") {
    const message = `Resource not found`;
    error = new ErrorResponse(message, 400);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 501).json({
    error: error.message || "Server error",
  });
};
