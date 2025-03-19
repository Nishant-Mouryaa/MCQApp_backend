const express = require('express');
const router = express.Router();
const textbooksController = require('../controllers/textbooksController');
const validateRequest = require('../middleware/validateRequest');
// Optionally: const auth = require('../middleware/auth');

router.get('/', textbooksController.getAllTextbooks);
router.post('/', /* auth, */ validateRequest('textbookValidation'), textbooksController.createTextbook);
router.put('/:id', /* auth, */ validateRequest('textbookValidation'), textbooksController.updateTextbook);
router.delete('/:id', /* auth, */ textbooksController.deleteTextbook);

module.exports = router;
