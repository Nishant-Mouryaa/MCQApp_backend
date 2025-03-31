const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const textbookController = require('../controllers/textbookController');
const authMiddleware = require('../middleware/authMiddleware');

// Configure Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Or some configurable path
  },
  filename: function (req, file, cb) {
    // e.g., textbook-<timestamp>.pdf
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'textbook-' + uniqueSuffix + ext);
  }
});

const fileFilter = (req, file, cb) => {
  // Accept only PDFs
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed!'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter
});

// POST /api/textbooks - upload a new textbook
router.post('/', authMiddleware, upload.single('pdf'), textbookController.createTextbook);

// PUT /api/textbooks/:id - update
router.put('/:id', authMiddleware, textbookController.updateTextbook);

// GET /api/textbooks
router.get('/', textbookController.getAllTextbooks);

// DELETE /api/textbooks/:id
router.delete('/:id', authMiddleware, textbookController.deleteTextbook);

module.exports = router;
