import nodemailer from 'nodemailer'

async function sendEmail(incidentDetails, senderAddress, recipientsList, subject, cause, message) {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: true,
        auth: {
            user: process.env.MAIL,  
            pass: process.env.PASSWORD  
        }
    });

    let text=''
    let html=''
    switch(cause) {
        case "New_Incident" : 
            text = `An incident has been reported with the following details: ${transformIncidentDetailsToText(incidentDetails)}`
            html = "<b>An incident has been reported with the following details:</b>" + transformIncidentDetailsToHTML(incidentDetails)
            break;
        case "Incident_approved":
            text = `An incident has been reported with the following details: ${transformIncidentDetailsToText(incidentDetails)}`
            html = "<b>An incident has been reported with the following details:</b>" + transformIncidentDetailsToHTML(incidentDetails)
            break;
        case "Incident_rejected":
        case "Incident_ignored":
            text = `An incident has been reported with the following details: ${transformIncidentDetailsToText(incidentDetails)}${showActionDetailsInText(incidentDetails, message)}`
            html = "<b>An incident has been reported with the following details:</b>" + transformIncidentDetailsToHTML(incidentDetails) + showActionDetailsInHTML(incidentDetails, message)
            break;
        case "Updated_Incident":
            text = `An update has been made to the incident which is reported already: ${transformIncidentDetailsToText(incidentDetails)}${showActionDetailsInText(incidentDetails, message)}`
            html = "<b>An update has been made to the incident which is reported already:</b>" + transformIncidentDetailsToHTML(incidentDetails) + showActionDetailsInHTML(incidentDetails, message)
            break;
    }


    let info = await transporter.sendMail({
        from: `"${senderAddress}" <${process.env.MAIL}>`, // sender address
        to: recipientsList.join(', '), // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
        html: html// html body
    });
    

    console.log("Message sent: %s", info.messageId);
}


function transformIncidentDetailsToText(incidentDetails) {
    return `\nType : ${incidentDetails.type}\nDetails: ${incidentDetails.details}\nAddress: ${incidentDetails.location.address}\n
    City: ${incidentDetails.location.city}\nState: ${incidentDetails.location.state}\n
    Location Co-ordinates: ${incidentDetails.location.co_ordinates.latitude} ${incidentDetails.location.co_ordinates.longitude}`
}

function transformIncidentDetailsToHTML(incidentDetails) {
    return `<br/>Type : ${incidentDetails.type}<br/>Details: ${incidentDetails.details}<br/>Address: ${incidentDetails.location.address}<br/>
    City: ${incidentDetails.location.city}<br/>State: ${incidentDetails.location.state}<br/>
    Location: <a href='https://www.google.com/maps/?q=${incidentDetails.location.co_ordinates.latitude},${incidentDetails.location.co_ordinates.longitude}'>Open Maps</a>`
}

function showActionDetailsInText(incidentDetails, message) {
    return `\n${incidentDetails.action ? `Status: ${incidentDetails.action}`: ``}\n${message ? `Message: ${message}`: ``}`;
}

function showActionDetailsInHTML(incidentDetails, message) {
    return `<br/>${incidentDetails.action ? `Status: ${incidentDetails.action}`: ``}<br/>${message ? `Message: ${message}`: ``}`;
}

export default sendEmail;