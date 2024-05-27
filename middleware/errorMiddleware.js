const errorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Mongoose cast error
  if (err.name === "CastError") {
    const message = "Resource Not Found";
    error = new errorResponse(message, 404);
  }
  // Duplicate key error
  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    error = new errorResponse(message, 400);
  }
  // Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
    error = new errorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

module.exports = errorHandler;
