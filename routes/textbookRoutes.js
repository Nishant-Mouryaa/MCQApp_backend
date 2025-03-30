const express = require('express');
const router = express.Router();
const textbookController = require('../controllers/textbooksController');
const upload = require('../middleware/upload');

router.get('/', textbookController.getAllTextbooks);
router.post('/', upload.single('pdf'), textbookController.uploadTextbook);
router.get('/:id', textbookController.getTextbook);
router.put('/:id', textbookController.updateTextbookMetadata);
router.delete('/:id', textbookController.deleteTextbook);
router.get('/:id/download', textbookController.downloadTextbook);

module.exports = router;