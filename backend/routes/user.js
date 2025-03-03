const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware, isAdmin, isAgentOrAdmin } = require('../middleware/auth');

// Get all users (admin only)
router.get('/', authMiddleware, isAdmin, userController.getAllUsers);

// Get all customers (agent/admin only)
router.get('/customers', authMiddleware, isAgentOrAdmin, userController.getCustomers);

// Create a new user (admin only)
router.post('/', authMiddleware, isAdmin, userController.createUser);

// Update a user (admin only)
router.put('/:id', authMiddleware, isAdmin, userController.updateUser);

// Delete a user (admin only)
router.delete('/:id', authMiddleware, isAdmin, userController.deleteUser);

module.exports = router;