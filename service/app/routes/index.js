import incidentRouter from './incident-route.js'
import donationCampaignRouter from './donation-campaign-route.js'
import safeHouseRouter from './safehouses-route.js';
import guidesRouter from './guides-route.js';
import userRouter from './user-route.js'
import express from 'express';

const initializeRoutes = (app) => {
    app.use('/incidents', incidentRouter)
    app.use('/donation-campaigns', donationCampaignRouter)
    app.use('/safehouses', safeHouseRouter); // Adding the safe houses route
    app.use('/guides',guidesRouter);
    app.use('/uploads', express.static('bucket/uploaded-files'));
    app.use('/users', userRouter);
}

export default initializeRoutes;