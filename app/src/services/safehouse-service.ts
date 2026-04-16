import serverUrl from ".";
import { SafeHouse } from "../models/Safehouse";

const path = 'safehouses'

export const createSafeHouse = async (safeHouseData: SafeHouse) => {
    try {
        const response = await fetch(`${serverUrl}/${path}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(safeHouseData) 
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Could not create safe house');
        }

        return await response.json();  
    } catch (error: any) {
        throw new Error('Failed to add safe house: ' + error.message);
    }
}

export const getAllSafeHouses = async () => {
    try {
        const response = await fetch(`${serverUrl}/${path}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Could not retrieve safe houses');
        }

        return await response.json();  // This will return an array of SafeHouse objects
    } catch (error: any) {
        throw new Error('Failed to retrieve safe houses: ' + error.message);
    }
}

export const deleteSafeHouse = async (id: string) => {
    try {
        const response = await fetch(`${serverUrl}/${path}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Could not delete safe house');
        }

    } catch (error: any) {
        throw new Error('Failed to delete safe house: ' + error.message);
    }
}

export const getSafeHouseById = async (id: string) => {
    try {
        const response = await fetch(`${serverUrl}/${path}/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Could not retrieve safe house');
        }

        return await response.json();  // This will return a SafeHouse object
    } catch (error: any) {
        throw new Error('Failed to retrieve safe house: ' + error.message);
    }
}

export const updateSafeHouse = async (id: string, safeHouseData: SafeHouse) => {
    try {
        const response = await fetch(`${serverUrl}/${path}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(safeHouseData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Could not update safe house');
        }

        return await response.json(); // Return the updated safe house data
    } catch (error: any) {
        throw new Error('Failed to update safe house: ' + error.message);
    }
}