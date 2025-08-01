const express = require('express');
const Job = require('../models/Job');
const { authenticate, requireAdmin } = require('../middleware/auth');
const router = express.Router();

// Get all jobs (public)
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs', error: error.message });
  }
});

// Create a job (admin only)
router.post('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ message: 'Error creating job', error: error.message });
  }
});

// Update a job (admin only)
router.put('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    res.status(400).json({ message: 'Error updating job', error: error.message });
  }
});

// Delete a job (admin only)
router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting job', error: error.message });
  }
});

module.exports = router;
