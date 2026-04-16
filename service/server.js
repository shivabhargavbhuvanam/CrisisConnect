import express from 'express';
import dotenv from 'dotenv';
import initialize from './app/app.js' 
import * as userSerivce from "./app/services/user-service.js";


dotenv.config();

const app = express();
const port = process.env.PORT;
initialize(app);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    userSerivce.synchronize();
});

// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import fetch from 'node-fetch'; // Assuming node-fetch is installed for making HTTP requests

// const app = express();

// app.use(cors());
// app.use(express.json());

// // Ensure you replace this with your environment variable
// mongoose.connect('mongodb+srv://pemmarajuv:dTNwtwcEdqy2IBcu@cluster0.z5f5zp3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
//   .then(() => console.log('MongoDB connected successfully'))
//   .catch(err => console.error('MongoDB connection error:', err));

// // Schema to include the state
// const locationSchema = new mongoose.Schema({
//   userId: { type: String, required: true, unique: true },
//   location: { type: String, required: true },
//   state: { type: String },
//   username: { type: String },
//   firstName: { type: String },
//   lastName: { type: String },
//   emailAddress: { type: String }
// });

// const Location = mongoose.model('Location', locationSchema);

// // Helper function to get state from Google Geocoding API
// async function getStateFromLocation(location) {
//   const apiKey = 'AIzaSyALvS5oK04po7EP4eNSm82BM6uv4pMbrhE'; // Make sure to store your Google API Key in an environment variable
//   const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${apiKey}`;

//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     const stateComponent = data.results[0].address_components.find(component =>
//       component.types.includes('administrative_area_level_1')
//     );
//     return stateComponent ? stateComponent.short_name : null;
//   } catch (error) {
//     console.error('Failed to fetch state from location:', error);
//     return null;
//   }
// }

// // Routes
// app.post('/location', async (req, res) => {
//   const { userId, location, username, firstName, lastName, emailAddress } = req.body;
  
//   try {
//     const state = await getStateFromLocation(location); // Fetch state based on location

//     const updatedLocation = await Location.findOneAndUpdate(
//       { userId },
//       { userId, location, state, username, firstName, lastName, emailAddress },
//       { new: true, upsert: true }
//     );
//     res.status(200).json(updatedLocation);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// app.get('/location/:userId', async (req, res) => {
//   const { userId } = req.params;
//   try {
//     const locationData = await Location.findOne({ userId });
//     if (locationData) {
//       res.status(200).json(locationData);
//     } else {
//       res.status(404).json({ message: 'Location not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
