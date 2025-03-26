const express = require('express');
const router = express.Router();
const questionsController = require('../controllers/questionsController');
// Optionally, include validation or authentication middleware
// const validateRequest = require('../middleware/validateRequest');

// GET /api/tests/:testId/questions - Retrieve questions for a test
router.get('/:testId/questions', questionsController.getQuestions);

// POST /api/tests/:testId/questions - Create a new question under a test
router.post('/:testId/questions', questionsController.createQuestion);

// PUT /api/questions/:id - Update a question by its ID
router.put('/:id', questionsController.updateQuestion);

// DELETE /api/questions/:id - Delete a question by its ID
router.delete('/:id', questionsController.deleteQuestion);

module.exports = router;
