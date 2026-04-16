export interface Incident {
    id?: string,
    type: IncidentType,
    details: string
    state: string,
    city: string,
    address: string,
    latitude?: number,
    longitude?: number,
    severityLevel: SeverityLevel,
    images?: string[],
    reportedBy: string,
    timeReported?: Date,
    timeActionChanged?: Date,
    approvedBy?: string
    action?: Action,
    message?: string
    // assignedSafeHouses: string[]
}

export enum IncidentType {
    "Earth Quake" = "Earth Quake",
    "Flooding" = "Flooding",
    "Shooting" = "Shooting",
    "Wildfires" = "Wildfires",
    "Terrorist Attacks" = "Terrorist Attacks",
    "Accident" = "Accident",
    "Landslides" = "Landslides"
}

export enum SeverityLevel {
    Low = "Low",
    Medium = "Medium",
    High = "High"
}

export enum Action {
    Approved = "approved",
    Rejected = "rejected",
    Ignored = "ignored"
}