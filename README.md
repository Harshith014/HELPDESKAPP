

---

# HelpDesk - MERN Stack Support Ticket Management System


HelpDesk is a comprehensive support ticket management system built with the MERN stack (MongoDB, Express.js, React, Node.js). This application provides role-based access for customers, customer service agents, and administrators to efficiently manage support tickets and customer information.

## 🌟 Features

### General Features
- **Role-Based Access Control**: Different functionalities for Customers, Agents, and Administrators
- **Responsive Design**: Fully optimized for mobile devices (320px, 375px, 425px), tablets, and desktops
- **Dark/Light Mode**: User-toggleable theme preference 
- **Client-Side Routing**: Seamless navigation with React Router

### Customer Features
- **Self-Registration**: Customers can create their own accounts
- **Ticket Management**: Submit new tickets, add notes/replies, and view ticket history
- **Attachment Support**: Upload files with tickets or notes

### Customer Service Agent Features
- **Ticket Oversight**: View and manage all customer tickets
- **Status Updates**: Change ticket statuses (Active, Pending, Closed)
- **Note Addition**: Add replies or notes to tickets with file attachment capability

### Admin Features
- **Full Ticket Access**: View and manage all tickets across the system
- **User Management**: Create, update, and delete user profiles
- **Dashboard Insights**: View statistics on tickets, customers, and agents
- **Status and Notes Management**: Update ticket statuses and add notes with attachments

## 🛠️ Technology Stack

### Backend
- **Node.js**: JavaScript runtime for server-side execution
- **Express.js**: Web framework for RESTful API development
- **MongoDB**: NoSQL database for storing ticket and user data
- **JWT Authentication**: Secure user sessions with JSON Web Tokens
- **Cloudinary**: Cloud storage solution for ticket attachments

### Frontend
- **React (Vite)**: JavaScript library for building the user interface
- **Tailwind CSS v4**: Utility-first CSS framework for styling
- **React Router**: Client-side routing for seamless navigation
- **Context API**: State management for user authentication
- **Axios**: Promise-based HTTP client for API requests
- **Heroicons**: SVG icon library for UI elements

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18+)
- npm (v9+) or yarn
- MongoDB (local installation or MongoDB Atlas account)
- Cloudinary account for file storage

## 🚀 Installation and Setup

### Clone the repository
```bash
git clone https://github.com/yourusername/helpdesk.git
cd helpdesk
```

### Backend Setup
```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

Create a .env file with the following variables
DATABASE_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Start the development server
node server.js
```

### Frontend Setup
```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Create a .env file with the following variable
# VITE_API_URL=http://localhost:5000/api

# Start the development server
npm run dev
```

## 📱 Usage

### User Roles and Access

1. **Customer**
   - Register a new account
   - Create support tickets
   - Add notes and attachments to their tickets
   - View their ticket history

2. **Customer Service Agent**
   - Access all customer tickets
   - Update ticket status
   - Add notes and replies to any ticket

3. **Administrator**
   - All agent capabilities
   - User management (create, edit, delete)
   - Dashboard with system statistics
   - System configuration

### Default Admin Account
```
Email: adminTest@gmail.com
Password: 123456
```
### Default User Account
```
Email: abc@gmail.com
Password: 123456
```
### Default Agent Account
```
Email: agentTest@gmail.com
Password: 123456
```

## 🔄 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new customer
- `POST /api/auth/login` - Login for all users
- `GET /api/auth/me` - Get current user info

### Tickets
- `GET /api/tickets` - Get all tickets (admin/agent) or user tickets (customer)
- `POST /api/tickets` - Create a new ticket
- `GET /api/tickets/:id` - Get a specific ticket
- `PUT /api/tickets/:id` - Update a ticket
- `DELETE /api/tickets/:id` - Delete a ticket

### Notes
- `POST /api/tickets/:id/notes` - Add a note to a ticket
- `GET /api/tickets/:id/notes` - Get all notes for a ticket

### Users
- `GET /api/users` - Get all users (admin only)
- `POST /api/users` - Create a new user (admin only)
- `PUT /api/users/:id` - Update a user (admin only)
- `DELETE /api/users/:id` - Delete a user (admin only)


## 🛣️ Roadmap

- **Email Notifications**: Alerts for ticket updates
- **Knowledge Base**: Self-service help articles
- **Chat Integration**: Real-time support chat
- **Reporting**: Advanced analytics and custom reports
- **SLA Management**: Service Level Agreement tracking

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [MongoDB](https://www.mongodb.com/)
- [Express.js](https://expressjs.com/)
- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Cloudinary](https://cloudinary.com/)
- [Heroicons](https://heroicons.com/)

---
