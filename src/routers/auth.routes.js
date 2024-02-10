import express from "express";
import * as authController from "../controllers/authController.js";
import authValidation  from "../middlewares/validations/authValidation.js";
import {verifyToken}  from "../middlewares/auth.js";

// Create express router
const router = express.Router();

// Routes for /api/ are added here
router.post("/login", authValidation.login, authController.login) 
router.post("/register", authValidation.register, authController.register)// Add authValidation.register middleware
router.get("/me", verifyToken, authController.me)   // Protected route - requires authentication header to access

export default router;