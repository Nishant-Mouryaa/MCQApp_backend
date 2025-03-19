const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');
const validateRequest = require('../middleware/validateRequest');
// Optionally: const auth = require('../middleware/auth');

router.get('/', notesController.getAllNotes);
router.post('/', /* auth, */ validateRequest('noteValidation'), notesController.createNote);
router.put('/:id', /* auth, */ validateRequest('noteValidation'), notesController.updateNote);
router.delete('/:id', /* auth, */ notesController.deleteNote);

module.exports = router;
