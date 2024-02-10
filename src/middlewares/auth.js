import jwt from "jsonwebtoken";
import APIError from "../utils/errors.js";
import User from "../models/userModel.js";

// Create a token from a payload
const createToken = async (user, res) => {
  // Create a token from a payload with the secret key and sign it. The expiration is set to one hour.
  const payload = {
    user: {
      id: user.id,
    },
    name: {
      name: user.name,
    },
  };
  // Create a token from a payload with the secret key and sign it. The expiration is set to one hour.
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    algorithm: "HS512",
    expiresIn: 3600,
  });

  return res.status(201).json({
    success: true,
    token: token,
    user: payload,
  });
};

// Token check
const verifyToken = async (req, res, next) => {
  // Get token from header
  const headerToken =
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ");

  // Check if not token
  if (!headerToken) throw new APIError("No token, authorization denied", 401);

  const token = req.headers.authorization.split(" ")[1];

  await jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {

    if (err) {
      throw new APIError("Token is not valid", 401);
    }
    const userInfo = await User.findById(decoded.user.id).select("_id name email");

    if (!userInfo) {
      throw new APIError("User not found", 401);
    }
    req.user = userInfo;
    next();
  });

};

export { createToken, verifyToken };
