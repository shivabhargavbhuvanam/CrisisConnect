import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phoneNo = process.env.TWILIO_PHONE;

const client = new twilio(accountSid, authToken);

async function sendSMS(incidentDetails, recipientsList) {
    let smsBody = `New Incident Reported. Please be alert and take necessary precautions. ${transformIncidentDetailsToText(incidentDetails)}`;

    try {
        for (const recipient of recipientsList) {
            const smsResult = await client.messages.create({
                body: smsBody,
                to: recipient,
                from: phoneNo
            });
            console.log(`Message sent to ${recipient}: ${smsResult.sid}`);
        }
    } catch (error) {
        console.error(`Failed to send SMS: ${error.message}`);
    }
}

function transformIncidentDetailsToText(incidentDetails) {
return `Type: ${incidentDetails.type}, Details: ${incidentDetails.details}, Location: ${incidentDetails.location.city}, ${incidentDetails.location.state}`;
}

export default sendSMS;