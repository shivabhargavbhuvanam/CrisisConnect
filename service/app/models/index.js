// Import individual model modules from their respective files.
import User from './user.js';
import Incident from './incident.js';
import DonationCampaign from './donation-campaign.js';
import SafeHouses from './safehouses.js';
import Guides from './guides.js'

// Export an object containing all the imported models.
export default {
    User,
    Incident,
    DonationCampaign,
    SafeHouses,
    Guides
}