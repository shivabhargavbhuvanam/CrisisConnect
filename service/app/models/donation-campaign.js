import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  username: String,
  emailAddress: String,
  donationAmount: Number,
});

const Donation = mongoose.model('Donation', donationSchema);

export default Donation;
