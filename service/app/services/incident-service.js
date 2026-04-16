import Incident from '../models/incident.js'
import { deleteFile } from './storage-service.js';
import mongoose from 'mongoose';
import * as mapsServiceUtil from './maps-service-util.js';
import sendEmail from './mail-service.js';


/**
 * Saves the Incident to db
 */
export const save = async(incident, files) => {
    // following code is added for testing purposes which has to be changed.    <---
    // constructing the incident obj and adding the paths of stored images
    try {
        const fullAddress = `${incident.address}, ${incident.city}, ${incident.state}`
        // This is used for fetching co-ordintates. Comment it to reduce API usage (for dev)
        const co_ordinates = await mapsServiceUtil.getCoordinatesForAddress(fullAddress)  
        console.log(co_ordinates);
    
        const constructedIncidentObj = {
            type: incident.type,
            details: incident.details,
            location: {
                state: incident.state,
                city: incident.city,
                address: incident.address, 
                co_ordinates: {
                    latitude: co_ordinates.latitude,
                    longitude: co_ordinates.longitude
                    // latitude: 42.3295713,
                    // longitude: -71.0901651
                }
            },
            severityLevel: incident.severityLevel,
            images: [...files.map(file => file.filename)],
            reportedBy: incident.reportedBy
        }
        const incidentInstance = new Incident(constructedIncidentObj);
        return await incidentInstance.save();
    } catch(error) {
        throw new Error(error);
    }

}

/**
 * Gets the incident by Id
 * @param {*} id 
 * @returns 
 */
export const get = async (id) => {
    const incident = await Incident.findById(id);
    return formatIncident(incident);
}


/**
 * Gets the incidents filtered by states array passed (case-insensitive)
 * @param {*} state 
 * @returns 
 */
export const getByStates = async (states) => {
    // Filter out undefined or null states before querying
    const validStates = states.filter(state => state !== undefined && state !== null);

    let incidents;
    if (validStates.length > 0) {
        // Using the $in operator to find incidents in any of the valid states
        incidents = await Incident.find({"location.state": { $in: validStates }});
    } else {
        // If no valid states are provided, return all incidents
        incidents = await Incident.find({});
    }
    
    return incidents.map(incident => formatIncident(incident));
};


export const getAll = async () => {
    const incidents = await Incident.find({});
    return incidents.map(incident => formatIncident(incident));
};



/**
 * Updates an existing incident. Also handles deletion of removed images
 * @param {*} incidentId 
 * @param {*} updatedIncidentData 
 * @returns 
 */
export const updateIncident = async (incidentId, requestData) => {
    const fetchedData = requestData.body;
    
    // Handling images set by form data (if only one image is present, formdata was sending it as string)
    if (Array.isArray(fetchedData.images)) {
        fetchedData.images = [...fetchedData.images];
    } else {
        fetchedData.images && (fetchedData.images = [fetchedData.images]);   // Turning it into an array if it's not already

    }

    const fullAddress = `${fetchedData.address}, ${fetchedData.city}, ${fetchedData.state}`
        // This is used for fetching co-ordintates. Comment it to reduce API usage (during dev)
        const co_ordinates = await mapsServiceUtil.getCoordinatesForAddress(fullAddress)  
        console.log(co_ordinates);
    
    const constructedIncidentObj = {
        type: fetchedData.type,
        details: fetchedData.details,
        location: {
            state: fetchedData.state,
            city: fetchedData.city,
            address: fetchedData.address, 
            co_ordinates: {
                latitude: co_ordinates.latitude,
                longitude: co_ordinates.longitude
                // latitude: 42.3295713,
                // longitude: -71.0901651
            }
        },
        severityLevel: fetchedData.severityLevel,
        images: [...requestData.files.map(file => file.filename)],
        action: fetchedData.action,
        message: fetchedData.message
    }

    if (fetchedData.images) {
        constructedIncidentObj.images = [...constructedIncidentObj.images, ...fetchedData.images]
    }

    const incident = await Incident.findById(incidentId);
    if (!incident) {
        throw new Error('Incident not found');
    }

    // Determine which images to delete
    const imagesToDelete = incident.images.filter(imagePath => !constructedIncidentObj.images?.includes(imagePath));

    // Delete images from the filesystem
    try{
        await Promise.all(imagesToDelete.map(imagePath => deleteFile(`./bucket/uploaded-files/${imagePath}`)));
    } catch(error) {
        console.log(error.message)
    }  

    // copies values from updatedIncidentData to incident
    Object.assign(incident, constructedIncidentObj);
    await incident.save();

    return incident;
};

/**
 * Updates the status of the incident and sends mail to appropriate users
 * @param {*} incidentId 
 * @param {*} actionData 
 * @returns 
 */
export const updateAction = async (incidentId, actionData) => {
    const incident = await Incident.findById(incidentId);
    if (!incident) {
        throw new Error('Incident not found');
    } 

    if (!actionData.action) {
        throw new Error('Action field missing');
    }

    incident.action = actionData.action;
    incident.message = actionData.message;
    incident.timeActionChanged = Date.now();

    await incident.save();

    return incident;
};

/**
 * Retrieves all incidents from the database.
 * @returns Array of incident objects
 */
export const getAllIncidents = async () => {
    try {
        const incidents = await Incident.find({});
        return incidents.map(incident => formatIncident(incident));
    } catch (error) {
        console.error('Failed to retrieve incidents:', error.message);
        throw new Error('Failed to retrieve incidents');
    }
}

export function formatIncident(incident) {
    return {
        id: incident.id,
        type: incident.type,
        details: incident.details,
        state: incident.location.state,
        city: incident.location.city,
        address: incident.location.address,
        latitude: incident.location.co_ordinates.latitude,
        longitude: incident.location.co_ordinates.longitude,
        severityLevel: incident.severityLevel,
        images: incident.images,
        reportedBy: incident.reportedBy,
        timeReported: incident.timeReported,
        timeActionChanged: incident.timeActionChanged,
        action: incident.action,
        message: incident.message
    };
}
