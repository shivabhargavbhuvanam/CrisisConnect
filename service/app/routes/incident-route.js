import express from 'express';
import * as incidentController from './../controllers/incident-controller.js';
import { upload } from '../services/storage-service.js';

const router = express.Router();

router.route('/')
    .post(upload.array('incident_files'),incidentController.post)
    .get(incidentController.getAllIncidents)

router.route('/location')
    .get(incidentController.getAllByLocation)

router.route('/:id')
    .get(incidentController.get)
    .put(upload.array('more_incident_files'), incidentController.updateIncident)

router.route('/updateAction/:id')
    .patch(incidentController.updateAction)

export default router;