const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const User = require('../models/User');
const Job = require('../models/Job');
const { authenticate, requireAdmin } = require('../middleware/auth');

// Get admin statistics
router.get('/stats', authenticate, requireAdmin, async (req, res) => {
  try {
    const [
      totalApplications,
      totalUsers,
      totalJobs,
      pendingApplications,
      acceptedApplications,
      rejectedApplications,
      reviewedApplications
    ] = await Promise.all([
      Application.countDocuments(),
      User.countDocuments(),
      Job.countDocuments(),
      Application.countDocuments({ status: 'pending' }),
      Application.countDocuments({ status: 'accepted' }),
      Application.countDocuments({ status: 'rejected' }),
      Application.countDocuments({ status: 'reviewed' })
    ]);

    // Get recent applications
    const recentApplications = await Application.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('fullName userEmail jobTitle status createdAt');

    // Get applications by month for chart data
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const applicationsByMonth = await Application.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);

    const stats = {
      totals: {
        applications: totalApplications,
        users: totalUsers,
        jobs: totalJobs
      },
      applicationsByStatus: {
        pending: pendingApplications,
        accepted: acceptedApplications,
        rejected: rejectedApplications,
        reviewed: reviewedApplications
      },
      recentApplications,
      applicationsByMonth
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching statistics', error: error.message });
  }
});

// Get application analytics
router.get('/analytics/applications', authenticate, requireAdmin, async (req, res) => {
  try {
    const { period = '30' } = req.query; // days
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(period));

    const analytics = await Application.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            status: '$status'
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.date': 1 }
      }
    ]);

    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching analytics', error: error.message });
  }
});

module.exports = router;
