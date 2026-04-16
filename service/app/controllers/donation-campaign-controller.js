// donation-campaign-controller.js
import { createOrUpdateDonation } from '../services/donation-campaign-service.js';

async function handleDonation(req, res) {
  try {
    const donation = await createOrUpdateDonation(req.body);
    res.status(201).json({ message: 'Donation saved successfully', donation });
  } catch (error) {
    console.error('Error saving donation:', error);
    res.status(500).json({ error: 'Failed to save donation' });
  }
}

export { handleDonation };
