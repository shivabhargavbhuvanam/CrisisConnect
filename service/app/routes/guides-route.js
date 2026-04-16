// Guides routes: guides-route.js
import express from 'express';
import * as GuideController from '../controllers/guides-controller.js';

const router = express.Router();

router.post('/guides', GuideController.createGuide);
router.get('/guides', GuideController.getAllGuides);
router.get('/guides/:id', GuideController.getGuideById);
router.put('/guides/:id', GuideController.updateGuideById);
router.delete('/guides/:id', GuideController.deleteGuideById);

export default router;
