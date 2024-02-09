// Purpose: Define a custom error class for API errors.
class APIError extends Error {
  // Define a constructor with message and status code parameters.
  constructor(message, statusCode) {
    super(message);// Call the super constructor and pass in the message parameter.
    this.statusCode = statusCode || 400;// Set the status code property to the statusCode parameter or 400.
  }
}

export default APIError;
