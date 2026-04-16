import serverUrl from ".";
import { Incident } from "../models/Incident";

const path = 'incidents'

// Sends form data to backend to create and save an incident in db
export const createIncident = async(incidentData: Incident, images: File[]) => {

    const formData = new FormData();
    formData.append('type', incidentData.type);
    formData.append('details', incidentData.details);
    formData.append('state', incidentData.state);
    formData.append('city', incidentData.city);
    formData.append('address', incidentData.address);
    formData.append('severityLevel', incidentData.severityLevel);
    formData.append('reportedBy', incidentData.reportedBy);

    // adding individual image to incident_files (formData)
    images.forEach(file => {
      formData.append('incident_files', file);
    });

    try {
      const response = await fetch(`${serverUrl}/${path}`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Could not create incident');
      }

      return await response.json();
    } catch (error: any) {
      throw new Error('Failed to submit incident: ' + error.message);
    }
}


// Fetches all the existing incidents based on location of the admin
export const getAllIncidentsForALocation = async (params: any) => {
  const searchParams = new URLSearchParams(params);
  console.log(`${serverUrl}/${path}?${searchParams.toString()}`)
  const response = await fetch(`${serverUrl}/${path}/location?${searchParams.toString()}`);
  if (!response.ok) {
      throw new Error('Failed to fetch incidents');
  }
  return response.json();
};


// Fetches an incident by id
export const getIncidentById = async (id: string) => {
  try {
      const response = await fetch(`${serverUrl}/${path}/${id}`);
      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Incident not found');
      }
      
      return response.json();
  } catch (error: any) {
      throw new Error('Failed to fetch incident: ' + error.message);
  }
};


// Update the status of incident to either approve, reject or ignore with some addditional message
export const updateIncidentStatus = async (id: string, action: string, message: string) => {
  try {
      const response = await fetch(`${serverUrl}/${path}/updateAction/${id}`, {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ action, message })
      });
      if (!response.ok) {
          throw new Error('Failed to update incident status');
      }
      return response.json();
  } catch (error) {
      console.error('Error updating incident status:', error);
      throw error;
  }
};

// update an Incident data (done by Admin)
export const updateIncident = async(incidentData: Incident, images: File[]) => {

  const formData = new FormData();
  formData.append('type', incidentData.type);
  formData.append('details', incidentData.details);
  formData.append('state', incidentData.state);
  formData.append('city', incidentData.city);
  formData.append('address', incidentData.address);
  formData.append('severityLevel', incidentData.severityLevel);
  incidentData.images?.forEach(image => {
    formData.append('images', image);
  });
  incidentData.action && formData.append('action', incidentData.action)
  incidentData.message && formData.append('message', incidentData.message)

  // adding individual image to incident_files (formData)
  images.forEach(file => {
    formData.append('more_incident_files', file);
  });

  try {
    const response = await fetch(`${serverUrl}/${path}/${incidentData.id}`, {
      method: 'PUT',
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Could not create incident');
    }

    return await response.json();
  } catch (error: any) {
    throw new Error('Failed to submit incident: ' + error.message);
  }
}


// Fetches all incidents from the database
export const getAllIncidents = async () => {
  try {
      const response = await fetch(`${serverUrl}/${path}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch incidents');
      }
      return await response.json();
  } catch (error: any) {
      console.error('Error fetching all incidents:', error.message);
      throw new Error('Failed to fetch all incidents: ' + error.message);
  }
};
