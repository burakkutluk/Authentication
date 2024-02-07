import express from 'express';
import auth from './authRoute.js';

const router = express.Router();

router.use(auth);

export default router;