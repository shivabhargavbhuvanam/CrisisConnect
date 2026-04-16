import express from "express";
import * as SafeHouseController from './../controllers/safehouses-controller.js';

const router = express.Router();

router.route('/')
    .get(SafeHouseController.getAllSafeHouses)
    .post(SafeHouseController.createSafeHouse);
    
router.route('/:id')
    .get(SafeHouseController.getSafeHouseById)
    .put(SafeHouseController.updateSafeHouse)
    .delete(SafeHouseController.deleteSafeHouse);

export default router;