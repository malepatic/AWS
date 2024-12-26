const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.header('token'); // Assuming you're sending the token in headers

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your JWT secret here
    req.user = decoded; // Attach the user to the request
    next();
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = { authenticateToken };