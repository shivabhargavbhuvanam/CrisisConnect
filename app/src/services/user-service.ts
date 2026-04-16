import serverUrl from ".";

const path = 'users';

/**
 * Fetches the location of the signed in user 
 * @param username 
 * @returns 
 */
export const getUserLocation = async (username: string | null) => {
    try {
        if (username) {
            const response = await fetch(`${serverUrl}/${path}/location/${username}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // Include other headers as needed, for example, authorization headers.
                }
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
    
            const data = await response.json();
            console.log(data)
            return data;
        }
        return null;
    } catch (error) {
        console.error('Error fetching user location:', error);
        throw error;  // Rethrow to handle it further in the component.
    }
};

/**
 * Makes a call to the backend to update the location of the user
 * @param username 
 * @param location 
 * @returns 
 */
export const updateUserLocation = async (username: string | null | undefined, location: string) => {
    try {
        if (!username) {
            throw new Error('username not found');
        }
        const response = await fetch(`${serverUrl}/${path}/location/${username}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ location })
        });

        if (!response.ok) {
            throw new Error('Failed to update location');
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating user location:', error);
        throw error;
    }
};