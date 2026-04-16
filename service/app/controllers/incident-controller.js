import { setResponse, setError } from "./response-handler.js"
import * as incidentService from '../services/incident-service.js'
import * as userService from '../services/user-service.js'
import sendEmail from "../services/mail-service.js";
import sendSMS from "../services/sms-service.js";


const ADMIN = (process.env.ADMIN && process.env.ADMIN.trim() !== '') ? process.env.ADMIN : 'crisis-connect-admin';

/**
 * Creates an incident
 * @param {*} request 
 * @param {*} response 
 */
export const post = async(request, response) => {
    try {
        // makes a call to service, to store the incident
        const savedIncident = await incidentService.save(request.body, request.files);
        if(savedIncident) {
            // Fetching admin details from the db to send a mail alert to the admin
            const adminUser = await userService.userExists(ADMIN);
            if(ADMIN && adminUser.email) {
                await sendEmail(savedIncident, "Incident Alert System", [adminUser.email], "New Incident Alert", "New_Incident");
            }

        }
        setResponse(response, 200, 'Incident created', savedIncident);
    } catch (error) {
        setError(response, 500, error.message, error);
    }
}

/**
 * Gets the incident by Id
 * @param {*} request 
 * @param {*} response 
 * @returns 
 */
export const get = async (request, response) => {
    try {
        const incident = await incidentService.get(request.params.id);
        if (!incident) {
            setResponse(response, 404, 'Incident not found')
            return;
        }
        setResponse(response, 200, 'Incident Fetched', incident)
    } catch (error) {
        setError (response, 500, error.message, error)
    }
};


/**
 * Fetches all incidents reported from a specific location (city)
 * @param {*} request 
 * @param {*} response 
 */
export const getAllByLocation = async (request, response) => {
    try {
        const {state1, state2, desired = 'approved'} = request.query;

        const incidents = (state1 || state2) ? await incidentService.getByStates([state1, state2]) : await incidentService.getAll();
        let filtered_incidents = incidents;
        if (desired === 'approved') {
            filtered_incidents = incidents.filter(incident => incident.action === 'approved');
        }

        // Define groups
        const grouped = {
            pending: [],
            approved: [],
            rejected: [],
            ignored: []
        };


        // Group incidents by action status
        filtered_incidents.forEach(incident => {
            const status = incident.action || 'pending'; // Default to 'Pending' if no action specified
            if (grouped[status]) {
                grouped[status].push(incident);
            }
        });


        // Sort each group by specified criteria
        grouped.pending.sort((a, b) => new Date(a.timeReported) - new Date(b.timeReported)); // Ascending for Pending
        ['approved', 'rejected', 'ignored'].forEach(status => {
            grouped[status].sort((a, b) => new Date(b.timeActionChanged) - new Date(a.timeActionChanged)); // Descending for others
        });

        console.log(grouped);
        setResponse(response, 200, 'Success', desired === 'approved' ? grouped.approved: grouped);

    } catch (error) {
        setError(response, 500, 'An error occurred while fetching incidents by city.', error);
    }
};


/**
 * Updates an existing incident
 * @param {*} request 
 * @param {*} response 
 */
export const updateIncident = async (request, response) => {
    try {
        const incidentId = request.params.id;
        
        const savedIncident = await incidentService.updateIncident(incidentId, request);

        if(savedIncident) {
            // Fetching all the users present in the state where the incident has happened and notifying them of the updates
            const users = await userService.getUsersByLocation(savedIncident.location.state)
            const userEmailIds = users.map(user => user.email)
            const userPhoneNumbers = users.map(user => user.phoneNumber)
            await sendEmail(savedIncident, "Incident Alert System", [userEmailIds], "Incident Alert Updated", "Updated_Incident");
            // await sendSMS(savedIncident, "Incident Alert",[userPhoneNumbers],"New Incident");
        }

        setResponse(response, 200, 'Incident updated successfully', incidentService.formatIncident(savedIncident));
    } catch (error) {
        setError(response, 500, 'Failed to update incident', error);
    }
};

/**
 * Updates the incident data whether it is approved, rejected or ignored
 * @param {*} request 
 * @param {*} response 
 */
export const updateAction = async (request, response) => {
    try {
        const incidentId = request.params.id;
        
        const updatedIncident = await incidentService.updateAction(incidentId, request.body);

        if (updatedIncident) {
            // All users present in the state where the incident has happened should be notified
            if (updatedIncident.action === 'approved') {
                // Fethces all the users present in the state where incident has happened
                const users = await userService.getUsersByLocation(updatedIncident.location.state)
                const userEmailIds = users.map(user => user.email)
                const userPhoneNos = users.map(user => user.phoneNumber)
                if (userEmailIds) {
                    // Sending mail to all those users
                    await sendEmail(updatedIncident, "Incident Alert System", [userEmailIds], "New Incident Alert", "Incident_approved");
                }
                if (userPhoneNos) {
                    // await sendSMS(updatedIncident, userPhoneNos);
                }
            } else {
                // As the incident is rejected or ignored, the same status should be notified to the user who has reported it
                const incidentReportedUser = await userService.userExists(updatedIncident.reportedBy);
                console.log(updateIncident.reportedBy, incidentReportedUser);
                if(incidentReportedUser && incidentReportedUser.email) {
                    await sendEmail(updatedIncident, "Incident Alert System", [incidentReportedUser.email], "Incident Alert Status Update", `Incident_${updatedIncident.action}`, updatedIncident.message);
                }
            }
        }

        setResponse(response, 200, "Incident's action updated successfully", incidentService.formatIncident(updatedIncident));
    } catch (error) {
        setError(response, 500, 'Failed to update incident', error);
    }
};

/**
 * Fetches all incidents from the database.
 * @param {*} request 
 * @param {*} response 
 */
export const getAllIncidents = async (request, response) => {
    try {
        const incidents = await incidentService.getAllIncidents();
        setResponse(response, 200, 'All incidents fetched successfully', incidents);
    } catch (error) {
        setError(response, 500, 'Failed to fetch all incidents', error);
    }
};
