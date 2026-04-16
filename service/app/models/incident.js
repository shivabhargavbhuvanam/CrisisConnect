import mongoose from "mongoose";
import schemaConfig from "./schema-config.js";

const Schema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    location: {
        state: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        co_ordinates: {
            latitude: {
                type: Number,
                required: true
            }, 
            longitude: {
                type: Number,
                required: true
            }
        }
    },
    severityLevel: {
        type: String,
        required: true
    }, 
    images: {
        type: [String]
    },
    reportedBy: {
        type: String
    },
    timeReported: {
        type: Date,
        default: Date.now(),
        immutable: true
    },
    timeActionChanged: {
        type: Date
    },
    // should be added later                              <--
    // approvedBy: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'admin',
    // }
    action: {
        type: String
    },
    message: {
        type: String
    }
    // should be added later when safe house is added                 <--
    // assignedSafeHouses: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'safe-house'
    // }]
}, schemaConfig);

const model = mongoose.model('incident', Schema);

export default model;
