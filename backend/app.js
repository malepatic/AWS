const express = require('express');
const connectDB = require('./db');
const eventRoutes = require('./routes/events');  // Import event routes
const {registerRouter} = require('./routes/register')
const {roleRouter} = require('./routes/role')
const {loginRouter} = require('./routes/login')
const {userRouter} = require('./routes/user')
const app = express();
const cors = require("cors")

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors())

// Connect to MongoDB
connectDB();

// Use the routes
app.use('/api/signup', registerRouter)
app.use('/api/events', eventRoutes);  // Add the event routes
app.use('/api/roles', roleRouter)
app.use('/api/login', loginRouter)
app.use('/api/user', userRouter)

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});