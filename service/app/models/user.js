import mongoose from "mongoose";

// more user details to be added
const Schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true // Ensure username is unique
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        validate: {
            validator: function(value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    phoneNumber: {
        type: String
    },
    location: {
        type: String
    }
});

const model = mongoose.model('user', Schema);

export default model;