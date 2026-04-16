import express from 'express';
import { handleDonation } from '../controllers/donation-campaign-controller.js'; 
const router = express.Router();

router.post('/payment', handleDonation);

export default router;

