const express = require('express');
const connectDB = require('./db');
const eventRoutes = require('./routes/events');  // Import event routes

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB
connectDB();

// Use the routes
app.use('/api/events', eventRoutes);  // Add the event routes

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});