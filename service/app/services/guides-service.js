// Guides service layer: guides-service.js
import Guide from '../models/guides.js';

const createGuide = async (guideData) => {
    const guide = new Guide(guideData);
    return guide.save();
};

const getAllGuides = async () => {
    return Guide.find({});
};

const getGuideById = async (id) => {
    return Guide.findById(id);
};

const updateGuideById = async (id, guideData) => {
    return Guide.findByIdAndUpdate(id, guideData, { new: true });
};

const deleteGuideById = async (id) => {
    return Guide.findByIdAndDelete(id);
};

export { createGuide, getAllGuides, getGuideById, updateGuideById, deleteGuideById };
