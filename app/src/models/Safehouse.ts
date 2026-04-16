export interface Coordinates {
    latitude: number;
    longitude: number;
}

export interface Location {
    coordinates: Coordinates;
}

export interface SafeHouse {
    id: string;
    name: string;
    email: string;
    location: Location;
    address: string;
}


