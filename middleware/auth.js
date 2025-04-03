const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwtConfig');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Verify header format
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ message: 'Invalid token format' });
  }

  const token = parts[1];
  
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      console.error('JWT Verify Error:', err.message);
      return res.status(401).json({ 
        message: 'Invalid token',
        error: err.message 
      });
    }

    // Verify payload structure
    if (!decoded?.userId) {
      return res.status(401).json({ message: 'Invalid token payload' });
    }

    req.user = {
      userId: decoded.userId,
      role: decoded.role || 'user'
    };
    
    next();
  });
};