// routes/testRoutes.js
const express = require('express');
const router = express.Router();
const testsController = require('../controllers/testsController');
const authMiddleware = require('../middleware/auth'); // Adjust path if needed

// Get all tests (protected route)
router.get('/', authMiddleware, testsController.getAllTests);

// Create a new test (protected route)
router.post('/', authMiddleware, testsController.createTest);

// Update a test (protected route)
router.put('/:id', authMiddleware, testsController.updateTest);

// Delete a test (protected route)
router.delete('/:id', authMiddleware, testsController.deleteTest);

module.exports = router;
