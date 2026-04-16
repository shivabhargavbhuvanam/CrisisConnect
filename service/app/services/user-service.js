import User from '../models/user.js'
import { fetchUsers } from "./fetch-users-from-clerk.js";

/**
 * Checks if a user exists already by comparing the username and returns user details
 * @param {*} username 
 * @returns 
 */
async function userExists(username) {
    return await User.findOne({ username: username });
}
 

/**
 * Receives a list of users. If the user exists, details are updated. If not, user is inserted.
 * @param {*} users 
 */
async function insertUsers(users) {
    try {
        const newUsers = [];

        for (const user of users) {
            const fetchedUser = await userExists(user.username); // Attempt to fetch existing user
            if (!fetchedUser) { 
                newUsers.push(new User(user));
            } else {
                // Update properties of the fetched user
                fetchedUser.firstName = user.firstName;
                fetchedUser.lastName = user.lastName;
                fetchedUser.email = user.email;
                fetchedUser.phoneNumber = user.phoneNumber; // Ensure all fields are covered
        
                await fetchedUser.save(); // Save updates
            }
        }
        
        // Later, insert all new users at once
        if (newUsers.length > 0) {
            await User.insertMany(newUsers, { ordered: false });
            console.log(`${newUsers.length} new users have been successfully inserted into the database.`);
        } else {
            console.log("No new users to insert.");
        }
    } catch (error) {
        console.error('Failed to insert new users:', error);
    }
}


/**
 * Fetches the users from Clerk and update or inserts them
 */
async function synchronize() {
    console.log('Starting user synchronization...');
    try {
        await fetchUsers();
        console.log('User synchronization complete.');
    } catch (error) {
        console.error('Error during user synchronization:', error);
    }
}

/**
 * Updates the location of a user based on username
 * @param {*} username 
 * @param {*} newLocation 
 * @returns 
 */
const updateLocation = async (username, newLocation) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { username: username },
            { $set: { location: newLocation } },
            { new: true, runValidators: true }
        );
        if (!updatedUser) {
            throw new Error('User not found');
        }
        return updatedUser;
    } catch (error) {
        console.error('Error updating user location:', error);
        throw error;
    }
};


/**
 * Fetches all users based on location (state)
 * @param {*} location
 * @returns
 */
async function getUsersByLocation(location) {
    try {
        return await User.find({ location: location });
    } catch (error) {
        console.error('Error fetching users by location:', error);
        throw error;
    }
}

 
export { insertUsers, synchronize, userExists, updateLocation, getUsersByLocation };