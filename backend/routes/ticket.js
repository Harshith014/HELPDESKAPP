const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const { authMiddleware, isAgentOrAdmin } = require('../middleware/auth');

// Create a new ticket
router.post('/', 
  authMiddleware, 
  ticketController.upload.array('attachments', 5), 
  ticketController.createTicket
);

// Get all tickets (filtered by user role)
router.get('/', authMiddleware, ticketController.getTickets);

// Get a specific ticket
router.get('/:id', authMiddleware, ticketController.getTicketById);

// Add note to a ticket
router.post('/:id/notes', 
  authMiddleware, 
  ticketController.upload.array('attachments', 5), 
  ticketController.addNote
);

// Update ticket status (agent/admin only)
router.patch('/:id/status', 
  authMiddleware, 
  isAgentOrAdmin, 
  ticketController.updateTicketStatus
);

module.exports = router;