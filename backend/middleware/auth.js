const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.headers.token; // Assuming you're sending the token in headers
  console.log(token)
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWTSECRETKEY); // Use your JWT secret here
    req.user = decoded.id; // Attach the user to the request
    next();
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token' + error});
  }
};

module.exports = {authenticateToken : authenticateToken};