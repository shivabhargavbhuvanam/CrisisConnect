// Guides controller: guides-controller.js
import * as GuideService from '../services/guides-service.js';

const createGuide = async (req, res) => {
    try {
        const guide = await GuideService.createGuide(req.body);
        res.status(201).json(guide);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAllGuides = async (req, res) => {
    try {
        const guides = await GuideService.getAllGuides();
        res.json(guides);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getGuideById = async (req, res) => {
    try {
        const guide = await GuideService.getGuideById(req.params.id);
        if (!guide) {
            return res.status(404).json({ error: 'Guide not found' });
        }
        res.json(guide);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateGuideById = async (req, res) => {
    try {
        const guide = await GuideService.updateGuideById(req.params.id, req.body);
        if (!guide) {
            return res.status(404).json({ error: 'Guide not found' });
        }
        res.json(guide);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteGuideById = async (req, res) => {
    try {
        const guide = await GuideService.deleteGuideById(req.params.id);
        if (!guide) {
            return res.status(404).json({ error: 'Guide not found' });
        }
        res.json({ message: 'Guide successfully deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { createGuide, getAllGuides, getGuideById, updateGuideById, deleteGuideById };
