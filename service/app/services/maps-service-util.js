export const getCoordinatesForAddress = async (address) => {
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.status !== 'OK') {
            throw new Error('Failed to get the location, status: ' + data.status);
        }
        const { lat, lng } = data.results[0].geometry.location;
        return { latitude: lat, longitude: lng };
    } catch (error) {
        console.error('Geocoding failed:', error);
        throw error;
    }
};