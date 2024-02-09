// Purpose: Response class to handle response from server.
class Response {
  // Define a constructor with data and message parameters.
  constructor(data = null, message = null) {
    this.data = data;
    this.message = message;
  }

  // Define a success method that takes a res parameter.
  success(res) {
    return res.status(200).json({
      success: true,
      data: this.data,
      message: this.message ?? "Succesfull",
    });
  }

  created(res) {
    return res.status(201).json({
      success: true,
      data: this.data,
      message: this.message ?? "Succesfull",
    });
  }

  error500(res) {
    return res.status(500).json({
      success: false,
      data: this.data,
      message: this.message ?? "Network error !",
    });
  }

  error400(res) {
    return res.status(400).json({
      success: false,
      data: this.data,
      message: this.message ?? "Bad Request!",
    });
  }

  error401(res) {
    return res.status(401).json({
      success: false,
      data: this.data,
      message: this.message ?? "Unathorized!",
    });
  }

  error404(res) {
    return res.status(404).json({
      success: false,
      data: this.data,
      message: this.message ?? "Not Found !",
    });
  }

  error429(res) {
    return res.status(429).json({
      success: false,
      data: this.data,
      message: this.message ?? "Too Many Requests!",
    });
  }
}

export default Response;
