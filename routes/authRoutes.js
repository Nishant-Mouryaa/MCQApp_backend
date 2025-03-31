const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Add the register route
router.post('/register', authController.register); 
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/refresh', authController.refreshToken);
router.get('/me', authController.getCurrentUser);

module.exports = router;