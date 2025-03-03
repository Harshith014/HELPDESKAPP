const dotenv = require('dotenv');
dotenv.config();

const Ticket = require('../models/Ticket');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

exports.upload = upload;

// Create a new ticket
exports.createTicket = async (req, res) => {
  try {
    const { title, description } = req.body;
    const attachments = [];

    // Upload files to Cloudinary
    if (req.files) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path);
        attachments.push({
          fileName: file.originalname,
          url: result.secure_url,
          fileType: file.mimetype,
          publicId: result.public_id
        });
      }
    }

    // Create ticket
    const ticket = new Ticket({
      title,
      description,
      customer: req.user._id,
      notes: [{
        content: description,
        addedBy: req.user._id,
        attachments
      }]
    });

    await ticket.save();

    res.status(201).json({
      message: 'Ticket created successfully',
      ticket
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create ticket', error: error.message });
  }
};

// Get all tickets (with role-based filtering)
exports.getTickets = async (req, res) => {
  try {
    let tickets;

    // If user is a customer, return only their tickets
    if (req.user.role === 'customer') {
      tickets = await Ticket.find({ customer: req.user._id })
        .populate('customer', 'name email')
        .populate('notes.addedBy', 'name role')
        .sort({ lastUpdated: -1 });
    } 
    // If agent or admin, return all tickets
    else {
      tickets = await Ticket.find()
        .populate('customer', 'name email')
        .populate('notes.addedBy', 'name role')
        .sort({ lastUpdated: -1 });
    }

    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tickets', error: error.message });
  }
};

// Get a specific ticket by ID
exports.getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate('customer', 'name email')
      .populate('notes.addedBy', 'name role');

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Check if user has access to this ticket
    if (req.user.role === 'customer' && ticket.customer._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ticket', error: error.message });
  }
};

// Add note to a ticket
exports.addNote = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Check if user has access to add notes to this ticket
    if (req.user.role === 'customer' && ticket.customer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const newNote = {
      content: req.body.content,
      addedBy: req.user._id,
      attachments: []
    };

    // Upload files to Cloudinary
    if (req.files) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path);
        newNote.attachments.push({
          fileName: file.originalname,
          url: result.secure_url,
          fileType: file.mimetype,
          publicId: result.public_id
        });
      }
    }

    // Add note to ticket
    ticket.notes.push(newNote);
    ticket.lastUpdated = Date.now();

    await ticket.save();

    // Populate user info for the new note
    const updatedTicket = await Ticket.findById(req.params.id)
      .populate('customer', 'name email')
      .populate('notes.addedBy', 'name role');

    res.json({
      message: 'Note added successfully',
      ticket: updatedTicket
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add note', error: error.message });
  }
};

// Update ticket status
exports.updateTicketStatus = async (req, res) => {
  try {
    // Check if user is authorized to update ticket status (agent or admin)
    if (req.user.role === 'customer') {
      return res.status(403).json({ message: 'Access denied: Only agents and admins can update ticket status' });
    }

    const { status } = req.body;

    // Validate status
    if (!['Active', 'Pending', 'Closed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Update status
    ticket.status = status;
    ticket.lastUpdated = Date.now();

    // Add a note about status change
    ticket.notes.push({
      content: `Ticket status changed to ${status}`,
      addedBy: req.user._id
    });

    await ticket.save();

    res.json({
      message: 'Ticket status updated successfully',
      ticket
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update ticket status', error: error.message });
  }
};