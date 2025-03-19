const express = require('express');
const router = express.Router();
const testsController = require('../controllers/testsController');
const validateRequest = require('../middleware/validateRequest');
// Optionally: const auth = require('../middleware/auth');

// GET /api/tests - Retrieve list of tests
router.get('/', testsController.getAllTests);

// POST /api/tests - Create a new test
router.post('/', /* auth, */ validateRequest('testValidation'), testsController.createTest);

// PUT /api/tests/:id - Update an existing test
router.put('/:id', /* auth, */ validateRequest('testValidation'), testsController.updateTest);

// DELETE /api/tests/:id - Delete a test
router.delete('/:id', /* auth, */ testsController.deleteTest);

// Optional: Manage test questions (nested routes)
router.get('/:id/questions', testsController.getTestQuestions);
// More endpoints for adding/updating/deleting questions can be added similarly

module.exports = router;
