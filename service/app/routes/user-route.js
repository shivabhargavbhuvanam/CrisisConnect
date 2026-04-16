import express from 'express';
import * as userController from '../controllers/user-controller.js'

const router = express.Router();

router.route('/sync-users')
    .post(userController.synchronizeUsers);

router.route('/location/:username')
    .get(userController.getUserLocation)
    .post(userController.updateUserLocation)

router.route('/locations/:location')
    .get(userController.getUsersByLocation)

export default router;