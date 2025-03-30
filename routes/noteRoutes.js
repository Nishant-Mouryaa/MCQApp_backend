const express = require('express');
const router = express.Router();
const noteController = require('../controllers/notesController');

router.get('/', noteController.getAllNotes);
router.post('/', noteController.createNote);
router.get('/:id', noteController.getNote);
router.put('/:id', noteController.updateNote);
router.delete('/:id', noteController.deleteNote);

module.exports = router;