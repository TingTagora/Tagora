const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  firebaseUid: { type: String, required: true },
  userEmail: { type: String, required: true },
  jobTitle: { type: String },
  fullName: String,
  phone: String,
  experience: String,
  coverLetter: String,
  portfolio: String,
  availability: String,
  status: { type: String, enum: ['pending', 'reviewed', 'accepted', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Application', applicationSchema);
