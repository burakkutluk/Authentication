import express from "express";
import * as authController from "../controllers/authController.js";
import authValidation  from "../middlewares/validations/authValidation.js";

// Create express router
const router = express.Router();

// Routes for /api/ are added here
router.post("/login", authValidation.login, authController.login) 
router.post("/register", authValidation.register, authController.register)// Add authValidation.register middleware

export default router;