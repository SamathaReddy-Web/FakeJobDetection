import express from 'express';
import { verifyCompany } from '../controllers/companyController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/verify', protect, verifyCompany);

export default router;
