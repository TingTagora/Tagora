const express = require('express');
const Application = require('../models/Application');
const { authenticate, requireAdmin } = require('../middleware/auth');
const router = express.Router();

// Get all applications (admin only)
router.get('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching applications', error: error.message });
  }
});

// Create an application
router.post('/', async (req, res) => {
  const application = new Application(req.body);
  await application.save();
  res.status(201).json(application);
});

// Update application status (admin only)
router.put('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const application = await Application.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: 'Error updating application', error: error.message });
  }
});

// Delete an application (admin only)
router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.json({ message: 'Application deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting application', error: error.message });
  }
});

// Get applications by Firebase UID
router.get('/user/:firebaseUid', async (req, res) => {
  const { firebaseUid } = req.params;
  const applications = await Application.find({ firebaseUid }).sort({ createdAt: -1 });
  res.json(applications);
});

module.exports = router;
