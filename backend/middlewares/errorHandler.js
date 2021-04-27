const ErrorResponse = require("../utils/errorResponse");

exports.notFound = (req, res, next) => {
  next(
    new ErrorResponse(
      `Route not found - ${req.method} - ${req.originalUrl}`,
      404
    )
  );
};

exports.errorHandler = async (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  console.log(err.errors);

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 501).json({
    error: error.message || "Server error",
  });
};
