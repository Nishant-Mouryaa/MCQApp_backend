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

// Get a test by ID (protected route)
router.post('/test-results', authMiddleware, testsController.submitTestResults);

// Routes for managing questions
router.post('/:id/questions', authMiddleware, testsController.addQuestion);
router.put('/:id/questions/:questionId', authMiddleware, testsController.updateQuestion);
router.delete('/:id/questions/:questionId', authMiddleware, testsController.deleteQuestion);


module.exports = router;
