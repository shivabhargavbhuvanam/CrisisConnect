import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { insertUsers } from './user-service.js';
 
dotenv.config();
 
const clerkApiKey = process.env.CLERK_API_KEY; // Your Clerk API Key
const clerkApiUrl = 'https://api.clerk.dev/v1/users';
 
// Calls Clerks API's url to fetch all the signed up users info
async function fetchUsers() {
    try {
        const response = await fetch(clerkApiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${clerkApiKey}`,
                'Content-Type': 'application/json'
            },
        });
 
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
 
        const users = await response.json();
        const filteredUsers = users.map(user => ({
            username: user.username,
            firstName: user.first_name,
            lastName: user.last_name,
            phoneNumber: user.phone_number,
            email: user.email_addresses[0].email_address
        }));
 
        console.log("Users have been successfully fetched from Clerk API.");
        await insertUsers(filteredUsers);
    } catch (error) {
        console.error('Failed to fetch users:', error);
        throw new Error(error);
    }
}
 
export { fetchUsers };