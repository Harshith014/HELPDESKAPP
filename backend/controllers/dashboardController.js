const Ticket = require('../models/Ticket');
const User = require('../models/User');

// Get dashboard data (admin only)
exports.getDashboardData = async (req, res) => {
  try {
    // Check if user is an admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: Admin role required' });
    }
    
    // Get total tickets count
    const totalTickets = await Ticket.countDocuments();
    
    // Get tickets count by status
    const activeTickets = await Ticket.countDocuments({ status: 'Active' });
    const pendingTickets = await Ticket.countDocuments({ status: 'Pending' });
    const closedTickets = await Ticket.countDocuments({ status: 'Closed' });
    
    // Get total customers count
    const totalCustomers = await User.countDocuments({ role: 'customer' });
    
    // Get total agents count
    const totalAgents = await User.countDocuments({ role: 'agent' });
    
    // Get recent tickets
    const recentTickets = await Ticket.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('customer', 'name')
      .select('ticketId title status customer createdAt lastUpdated');
      
    res.json({
      ticketStats: {
        total: totalTickets,
        active: activeTickets,
        pending: pendingTickets,
        closed: closedTickets
      },
      userStats: {
        customers: totalCustomers,
        agents: totalAgents
      },
      recentTickets
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard data', error: error.message });
  }
};