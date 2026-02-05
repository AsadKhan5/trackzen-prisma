const { StatusCodes } = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
  console.log("Error in error-handler middleware:", err);
  
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong, try again later",
  };

  // Prisma/PostgreSQL specific errors
  if (err.code === "P2002") {
    // Unique constraint violation
    const field = err.meta?.target?.[0] || "field";
    customError.message = `${field} already exists, please choose another value`;
    customError.statusCode = StatusCodes.CONFLICT;
  }

  if (err.code === "P2025") {
    // Record not found
    customError.message = "Record not found";
    customError.statusCode = StatusCodes.NOT_FOUND;
  }

  if (err.code === "P2003") {
    // Foreign key constraint violation
    customError.message = "Invalid reference, related record does not exist";
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  if (err.code === "P2014") {
    // Required relation violation
    customError.message = "Invalid data, required relation is missing";
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // Validation errors
  if (err.name === "ValidationError") {
    customError.message = Object.values(err.errors).map(val => val.message).join(", ");
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  return res.status(customError.statusCode).json({ 
    success: false,
    message: customError.message 
  });
};

module.exports = errorHandlerMiddleware;
