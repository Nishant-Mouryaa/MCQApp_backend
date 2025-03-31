const express = require('express');
const router = express.Router();
const noteController = require('../controllers/notesController');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware ,noteController.getAllNotes);
router.post('/', authMiddleware, noteController.createNote);
router.get('/:id', authMiddleware, noteController.getNote);
router.put('/:id', authMiddleware, noteController.updateNote);  
router.delete('/:id', authMiddleware, noteController.deleteNote);

module.exports = router;