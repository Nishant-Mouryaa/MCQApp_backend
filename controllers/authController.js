const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET } = process.env;

const authController = {
  // User registration (add this new method)
  register: async (req, res) => {
    try {
      const { email, password, name } = req.body;
      
      // Check if user exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Create user
      const user = new User({
        email,
        password: hashedPassword,
        name,
        role: 'admin' // or 'user' based on your needs
      });

      await user.save();

      // Generate JWT
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.status(201).json({ 
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const cleanEmail = email.toLowerCase().trim();
  
      // Find user
      const user = await User.findOne({ email: cleanEmail });
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Debug: Log critical values
      console.log('Stored hash:', user.password);
      console.log('Input password:', password);
  
    
const isMatch = await bcrypt.compare(password, user.password);
console.log('Password comparison:', {
  inputPassword: `|${password}|`, // Shows whitespace
  length: password.length,
  hash: user.password,
  isMatch
});
  
      // Generate token
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      res.json({ token, user });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  logout: (req, res) => {
    // Typically handled client-side by removing the token
    res.json({ message: 'Logged out successfully' });
  },

  refreshToken: (req, res) => {
    // Implement token refresh logic here
    res.json({ message: 'Token refreshed' });
  },

  getCurrentUser: async (req, res) => {
    try {
      const user = await User.findById(req.userId).select('-password');
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = authController;