import APIError from "../utils/errors.js";
// Error handler middleware to display error as JSON response to the client.
const errorHandler = (err, req, res, next) => {
  if (err instanceof APIError) { // If the error is an instance of APIError class then return the error message.
    return res
      .status(err.statusCode || 400)
      .json({ success: false, message: err.message });
  }

  return res
    .status(500)
    .json({ success: false, message: "Something went wrong" });
};

export default errorHandler;
