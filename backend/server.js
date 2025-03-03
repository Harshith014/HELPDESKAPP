const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const ticketRoutes = require('./routes/ticket');
// const customerRoutes = require('./routes/customer');
const dashboardRoutes = require('./routes/dashboard');
const { authMiddleware } = require('./middleware/auth');
const connectDB = require('./db');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: [process.env.URI],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up file uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', authMiddleware, userRoutes);
app.use('/api/tickets', authMiddleware, ticketRoutes);
// app.use('/api/customers', authMiddleware, customerRoutes);
app.use('/api/dashboard', authMiddleware, dashboardRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Something went wrong!', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});