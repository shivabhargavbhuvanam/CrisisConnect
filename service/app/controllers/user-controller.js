import { setResponse, setError } from "./response-handler.js"
import * as userSerivce from '../services/user-service.js'

/**
 * Controller method which calls user service's synchronize method to pull all the user related data from Clerk API and store
 * the results in db
 * @param {*} req 
 * @param {*} res 
 */
export const synchronizeUsers = async (req, res) => {
    try {
        await userSerivce.synchronize();
        res.status(200).send('User synchronization is complete.');
    } catch (error) {
        console.error('Error during user synchronization:', error);
        res.status(500).send('Failed to synchronize users: ' + error.message);
    }
};

/**
 * Fetches the location of the user (state => he/she is in)
 * @param {*} req 
 * @param {*} res 
 */
export const getUserLocation = async (req, res) => {
    try {
        const username = req.params.username; // or wherever you get the userId from (e.g., req.user.id if authenticated)
        const user = await userSerivce.userExists(username);
        if (user) {
            setResponse(res, 200, 'Location retrieved successfully', user.location);
        }else {
            setResponse(res, 200, 'User not found');
        }
        
    } catch (error) {
        setError(res, 500, 'Failed to retrieve user location', error);
    }
};

/**
 * Updates the location of a user
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const updateUserLocation = async (req, res) => {
    const { username } = req.params;
    const { location } = req.body;

    if (!location) {
        return res.status(400).send('Location is required.');
    }

    try {
        const updatedUser = await userSerivce.updateLocation(username, location);
        setResponse(res, 200, 'Location updated successfully', updatedUser)
    } catch (error) {
        setError(res, 500, 'Failed to update the location', error)
    }
}


/**
 * Fetches users based on a given location (state)
 * @param {*} req
 * @param {*} res
 */
export const getUsersByLocation = async (req, res) => {
    const location = req.params.location;  // Assumes location is passed as a URL parameter
    try {
        const users = await userSerivce.getUsersByLocation(location);
        if (users.length > 0) {
            setResponse(res, 200, 'Users retrieved successfully', users);
        } else {
            setResponse(res, 404, 'No users found for this location');
        }
    } catch (error) {
        setError(res, 500, 'Failed to retrieve users', error);
    }
};