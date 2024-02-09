import express from 'express';
import auth from './auth.routes.js';

const router = express.Router();

// Routes for /api are added here 
router.use(auth);

export default router;