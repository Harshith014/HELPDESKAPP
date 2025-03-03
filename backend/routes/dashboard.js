const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { authMiddleware, isAdmin } = require('../middleware/auth');

// Get dashboard data (admin only)
router.get('/', authMiddleware, isAdmin, dashboardController.getDashboardData);

module.exports = router;