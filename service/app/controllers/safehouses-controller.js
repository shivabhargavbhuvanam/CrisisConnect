import * as SafeHouseService from './../services/safehouses-service.js';
import { setResponse, setError } from './response-handler.js';

/**
 * Fetch all safe houses.
 */
export const getAllSafeHouses = async (request, response) => {
    try {
        const safeHouses = await SafeHouseService.getAllSafeHouses();
        setResponse(response, 200, '', safeHouses); 
    } catch (error) {
        setError(response, 500, error.message, error); // Added proper status code and error handling
    }
}

/**
 * Fetch a single safe house by ID.
 */
export const getSafeHouseById = async (request, response) => {
    try {
        const id = request.params.id;
        const safeHouse = await SafeHouseService.getSafeHouseById(id);
        setResponse(response, 200, '', safeHouse); 
    } catch (error) {
        setError(response, 404, error.message, error); // Assumed status code for not found and error handling
    }
}

/**
 * Create a new safe house.
 */
export const createSafeHouse = async (request, response) => {
    try {
        const safeHouseData = request.body;
        const newSafeHouse = await SafeHouseService.createSafeHouse(safeHouseData);
        setResponse(response, 201, '', newSafeHouse); 
    } catch (error) {
        setError(response, 400, error.message, error); // Common status code for bad request on creation fail
    }
}

/**
 * Update an existing safe house.
 */
export const updateSafeHouse = async (request, response) => {
    try {
        const id = request.params.id;
        const safeHouseData = request.body;
        const updatedSafeHouse = await SafeHouseService.updateSafeHouse(id, safeHouseData);
        setResponse(response, 200, '', updatedSafeHouse);
    } catch (error) {
        setError(response, 400, error.message, error); // Status code for bad request or not found
    }
}

/**
 * Delete a safe house.
 */
export const deleteSafeHouse = async (request, response) => {
    try {
        const id = request.params.id;
        await SafeHouseService.deleteSafeHouse(id);
        setResponse(response, 204, "Safe house successfully deleted", {}); 
    } catch (error) {
        setError(response, 500, error.message, error); // Status code for server error
    }
}
