const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Register a new user
router.post('/register', authController.register);

// Login and get a JWT token
router.post('/login', authController.login);

// (Optional) Logout endpoint, blacklisting tokens, etc.
// router.post('/logout', authController.logout);

module.exports = router;
