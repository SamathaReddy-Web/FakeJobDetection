import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { checkJob, reportJob, getUserHistory } from '../controllers/jobController.js';

const router = express.Router();

router.post('/check', protect, checkJob);
router.post('/report', protect, reportJob);
router.get('/history', protect, getUserHistory);

export default router;
