import mongoose from "mongoose";
import SafeHouse from "./../models/safehouses.js";

/**
 * Fetch all safe houses.
 * 
 * @returns Array of all safe house objects
 */
export const getAllSafeHouses = async () => {
    const safeHouses = await SafeHouse.find({});
    return safeHouses || [];
}

/**
 * Fetch a single safe house by its ID.
 * 
 * @param {String} id - The ID of the safe house to retrieve
 * @returns The safe house object with the specified ID
 */
export const getSafeHouseById = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid ID format");
    }
    const safeHouse = await SafeHouse.findById(id);
    if (!safeHouse) {
        throw new Error("Safe house not found");
    }
    return safeHouse;
}

/**
 * Create a new safe house.
 * 
 * @param {Object} safeHouseData - The data for the new safe house
 * @returns The created safe house object
 */
export const createSafeHouse = async (safeHouseData) => {
    const safeHouse = new SafeHouse(safeHouseData);
    return await safeHouse.save();
}

/**
 * Update an existing safe house.
 * 
 * @param {String} id - The ID of the safe house to update
 * @param {Object} safeHouseData - The updated data for the safe house
 * @returns The updated safe house object
 */
export const updateSafeHouse = async (id, safeHouseData) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid ID format");
    }
    const safeHouse = await SafeHouse.findByIdAndUpdate(id, safeHouseData, { new: true, runValidators: true });
    if (!safeHouse) {
        throw new Error("Safe house not found");
    }
    return safeHouse;
}

/**
 * Delete a safe house.
 * 
 * @param {String} id - The ID of the safe house to delete
 * @returns The deleted safe house object
 */
export const deleteSafeHouse = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid ID format");
    }
    const safeHouse = await SafeHouse.findByIdAndDelete(id);
    if (!safeHouse) {
        throw new Error("Safe house not found");
    }
    return safeHouse;
}
