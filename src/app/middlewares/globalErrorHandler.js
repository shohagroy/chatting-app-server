const { Error } = require("mongoose");
const ApiError = require("../../errors/ApiError");
const env = require("../../config");
const handleValidationError = require("../../errors/handleValidationError");

const globalErrorHandler = (error, req, res, next) => {
  if (env.node_env === "development") {
    console.log(error);
  }
  let statusCode = 500;
  let message = "Something went wrong!";
  let errorMessages = [];

  if (error instanceof Error.ValidationError) {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error.statusCode;
    message = error.message;
    errorMessages = [
      {
        path: "",
        message: error.message,
      },
    ];
  } else if (error instanceof Error) {
    message = error.message;
    errorMessages = [
      {
        path: "",
        message: error.message,
      },
    ];
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: env.node_env === "development" ? error.stack : undefined,
  });
};

module.exports = globalErrorHandler;
