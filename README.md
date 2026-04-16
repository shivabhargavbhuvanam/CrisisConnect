# Crisis Connect

## Overview
CrisisKonnect is a full-stack MERN application designed to streamline the connection between individuals facing emergencies and the assistance they require. It's a comprehensive platform that provides real-time updates, resources for safe shelter, and tools for community support during crises.


[![Node][Node.js]][Node-url]
[![Express][Express.js]][Express-url]
[![MongoDB][Mongo]][Mongo-url]
[![React][React.js]][React-url]
[![Redux][Redux.js]][Redux-url]
[![JavaScript][JavaScript.com]][JavaScript-url]
[![TypeScript][TypeScript.com]][TypeScript-url]
[![Bootstrap][Bootstrap.com]][Bootstrap-url]
[![Material UI][MUI.com]][MUI-url]
[![Vite][Vite.js]][Vite-url]
[![Clerk Auth][Clerk.com]][Clerk-url]
[![Google Maps][GoogleMaps.com]][GoogleMaps-url]
[![OpenStreetMap][OpenStreetMap.org]][OpenStreetMap-url]
[![OpenAI][OpenAI.com]][OpenAI-url]
[![Nodemailer][Nodemailer.com]][Nodemailer-url]
[![Twilio][Twilio.com]][Twilio-url]



[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[Node-url]: https://nodejs.org/en
[Node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[Express.js]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
[Express-url]: https://expressjs.com
[Redux.js]: https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white
[Redux-url]: https://redux.js.org
[Mongo]: https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white
[Mongo-url]: https://www.mongodb.com
[MUI.com]: https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white
[MUI-url]: https://mui.com/
[Vite.js]: https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E
[Vite-url]: https://vitejs.dev/
[OpenAI.com]: https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white
[OpenAI-url]: https://openai.com/
[GoogleMaps.com]: https://img.shields.io/badge/Google%20Maps-4285F4?style=for-the-badge&logo=googlemaps&logoColor=white
[GoogleMaps-url]: https://www.google.com/maps
[OpenStreetMap.org]: https://img.shields.io/badge/OpenStreetMap-7EBC6F?style=for-the-badge&logo=openstreetmap&logoColor=white
[OpenStreetMap-url]: https://www.openstreetmap.org/
[Clerk.com]: https://img.shields.io/badge/Clerk-4B32C3?style=for-the-badge&logo=clerk&logoColor=white
[Clerk-url]: https://www.clerk.dev/
[JavaScript.com]: https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black
[JavaScript-url]: https://www.javascript.com/
[TypeScript.com]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[Nodemailer.com]: https://img.shields.io/badge/Nodemailer-4B32C3?style=for-the-badge&logo=nodemailer&logoColor=white
[Nodemailer-url]: https://nodemailer.com/
[Twilio.com]: https://img.shields.io/badge/Twilio-F22F46?style=for-the-badge&logo=twilio&logoColor=white
[Twilio-url]: https://www.twilio.com/


## Key Features

### User Features
- *Incident Reporting:* Users can report emergencies directly through the platform. Once these incidents are approved by administrators, they become visible to other users in the affected users in same state and not other states to avoid panicking amongst oeple.
- *Approved Incidents:* Users can view all approved incidents to stay informed about ongoing situations.
- *Guides for Crisis Situations:* Access detailed guides and safety measures tailored for specific emergencies.
- *Safe House Locator:* Find nearby safe houses approved and verified by administrators.
- *Donation Portal:* Integrated payment system via Stripe allows users to donate towards disaster management efforts.
- *AI-Powered Chatbot:* Leverages OpenAI to answer queries related to disaster management, helping users navigate the crisis more effectively.
- *Help Assistance:* Users can enter their address to find nearby hospitals and police stations, enhancing their ability to get immediate help.

### Admin Features
- *Incident Dashboard:* Admins can manage reported incidents, with options to accept, reject, or ignore, and edit details as necessary.
- *Safe House Management:* Ability to create, edit, and delete safe houses. Verification of addresses is done using mapping APIs.
- *Guide Management:* Admins can produce and revise guides that provide crucial information during various crisis scenarios.
- *Analytics Dashboard:* View and analyze data through maps and charts that display incident locations, types, and safe house distributions.

## Technical Stack


- *Frontend:* Developed using React, TypeScript, and JavaScript. Material UI & Bootstrap for UI Enhancement. State management is handled by Redux, and Vite is used as the build tool.
- *Backend:* Utilizes Node.js with Express.js and MongoDB for RESTful API services.
- *Authentication:* Implemented using Clerk for secure user authentication.
- *APIs:* Google Maps and OpenStreetMaps for geolocation services; Stripe for financial transactions; OpenAI for conversational AI capabilities.

## API's Integrated in the project:
Here's a concise summary of how each API is integrated and utilized in your disaster management system:

*1. Authentication (Clerk)*:
- Used for authentication in the React app's front end for managing sessions, sign-ups, and logins.
- Integrated into the backend middleware for session validation, fetching user data for sending emails and secure data management

*Example in ENV:*

VITE_CLERK_PUBLISHABLE_KEY="pk_test_.."- FrontEnd API Key

CLERK_API_KEY="sk_test_.." --- BackEnd API Key


*2. Geolocation Services (Google Maps and OpenStreetMaps)*:
- *Google Maps API*: Utilized in the backend for geocoding addresses when incidents or safe houses are reported. The front end uses Google Maps to display interactive maps showing locations of incidents and safe houses.
- *OpenStreetMaps*: Used as an alternative or in conjunction with Google Maps for displaying maps and performing geocoding in the frontend and backend.

*Example in ENV:*

REACT_APP_GOOGLE_MAPS_API_KEY=" AI...." --- GMAPS API Key

*3. Notification Services (Twilio, Nodemailer)*:
- *Twilio (SMS)*: Integrated into the backend to send SMS alerts about incident updates or nearby safe houses to users, especially after an incident is approved.
- *Nodemailer (Email)*: Configured in the backend to send email notifications about incident statuses to users and alert admins when new incident reports are filed.

*Example in ENV:*
TWILIO_AUTH_TOKEN = "5f.."  --- Twilio API Key


*4. AI Chatbot (OpenAI)*:
- *Backend Integration*: Uses OpenAI API to process and respond to user queries regarding disaster management.
- *Frontend Integration*: Integrated into the React application via a chat interface component that displays AI-generated responses to the user.

*Example in ENV:*
VITE_REACT_APP_OPENAI_API_KEY="sk-.."  --- OpenAI API Key


*5. Payment Gateway (Stripe)*:
- *Backend Service*: Handles API calls to process financial transactions securely.
- *Frontend Application*: Incorporates donation forms that collect user payment information and interact with the Stripe API through the backend.

*Example in ENV:*
VITE_STRIPE_KEY="pk_test.."  --- Stripe API Key


## Object Model 

 ```mermaid
---
Object Model 
---
classDiagram
    class User {
        +String username
        +String email
        +String role
        +reportIncident()
        +viewIncidents()
        +viewGuides()
        +donate()
        +findSafeHouses()
        +viewHelpAssistance()
    }

    class Admin {
        +approveIncident()
        +rejectIncident()
        +ignoreIncident()
        +editIncident()
        +createGuide()
        +editGuide()
        +deleteGuide()
        +createSafeHouse()
        +editSafeHouse()
        +deleteSafeHouse()
    }

    class Incident {
        +String type
        +String details
        +Location location
        +String severityLevel
        +String[] images
        +String reportedBy
        +DateTime timeReported
        +DateTime timeActionChanged
        +String action
        +generatesNotification()
    }

    class Guide {
        +String title
        +String content
        +String image
        +DateTime createdDate
    }

    class SafeHouse {
        +String name
        +Location address
        +String capacity
    }

    class Notification {
        +String message
        +DateTime timestamp
    }

    class Location {
        +String state
        +String city
        +String address
        +Coordinates coordinates
    }



    User "1" -- "0..*" Incident : reports >
    Admin "1" -- "0..*" Incident : manages >
    User "1" -- "0..*" Guide : views >
    Admin "1" -- "0..*" Guide : creates/edits/deletes >
    User "1" -- "0..*" SafeHouse : finds >
    Admin "1" -- "0..*" SafeHouse : creates/edits/deletes >
    User "1" -- "0..*" Notification : receives >
    Incident "1" -- "1" Location : has >
    SafeHouse "1" -- "1" Location : located at >
    Incident "1" -- "0..*" Notification : triggers >

```



## Getting Started
To set up and run Crisis Connect:

1. *Install Dependencies:*
   bash
   cd app
   npm install
   cd ../service
   npm install
   

2. *Environment Configuration:*
   - Rename .env.example to .env  in both app & service directory and populate it with the required API keys and database details.

3. *Run the Application:*
   - To start the backend service:
     bash
     cd service
     npm start
     
   - To launch the frontend application:
     bash
     cd app
     npm run dev