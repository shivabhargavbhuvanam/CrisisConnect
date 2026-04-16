// Assuming this is your schema file named guides-model.js
import mongoose from 'mongoose';

const guideSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    content: {
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now,
        required: true
    }
});

const Guide = mongoose.model('Guide', guideSchema);

export default Guide;





