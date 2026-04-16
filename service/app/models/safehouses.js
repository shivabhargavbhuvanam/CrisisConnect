import mongoose from "mongoose";
import schemaConfig from "./schema-config.js";

// Define a new Mongoose schema for the SafeHouse model.
const schema = new mongoose.Schema({
     // 'name' field to store the name of the safe house.
    name: { 
        type: String, 
        required: true 
    },
    // Location field to store the latitudes, longitudes
    location: {
        coordinates: {
            latitude: { type: Number, required: true },
            longitude: { type: Number, required: true }
        }
    },
    // 'email' field to store the contact email of the safe house.
    email: { 
        type: String, 
        required: true 
    },
    // 'address' field to store the physical address of the safe house.
    address: {
        type: String,
        required: true
    }
    
}, schemaConfig);

// Create a model from the defined schema.
const model = mongoose.model('SafeHouse', schema);

// Export the model
export default model;
