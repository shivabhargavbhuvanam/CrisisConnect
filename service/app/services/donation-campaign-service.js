// donation-campaign-service.js
import Donation from '../models/donation-campaign.js'

async function createOrUpdateDonation({ username, emailAddress, donationAmount }) {
  const existingDonation = await Donation.findOne({ username, emailAddress });
  if (existingDonation) {
    existingDonation.donationAmount += donationAmount;
    return existingDonation.save();
  } else {
    const newDonation = new Donation({
      username,
      emailAddress,
      donationAmount,
    });
    return newDonation.save();
  }
}

export { createOrUpdateDonation };
