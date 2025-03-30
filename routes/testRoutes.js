const express = require('express');
const router = express.Router();
const testController = require('../controllers/testsController');

router.get('/', testController.getAllTests);
router.post('/', testController.createTest);
router.get('/:id', testController.getTest);
router.put('/:id', testController.updateTest);
router.delete('/:id', testController.deleteTest);

// Questions routes
router.post('/:id/questions', testController.addQuestion);
router.put('/:id/questions/:qid', testController.updateQuestion);
router.delete('/:id/questions/:qid', testController.deleteQuestion);

module.exports = router;