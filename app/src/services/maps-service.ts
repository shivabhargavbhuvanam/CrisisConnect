const googleMapAPIUrl = "https://maps.googleapis.com/maps/api/geocode/json"


const google_maps_api_key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string; 


// Gets the co-ordinates of the current location and passes them to google api to extract the state code
export const getStateCodeFromCurrentLocation = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            try {
                // Reverse geocoding to get the state
                const response = await fetch(`${googleMapAPIUrl}?latlng=${latitude},${longitude}&key=${google_maps_api_key}`);
                const data = await response.json();
                const addressComponents = data.results[0].address_components;
                const stateObj = addressComponents.find((component: { types: string | string[]; }) => component.types.includes("administrative_area_level_1"));
                resolve(stateObj.short_name);
            } catch (error) {
                console.error('Error fetching location:', error);
                reject(error);
            }
        }, (error) => {
            reject(error);  // Reject the promise if geolocation fails
        });
    });
}


