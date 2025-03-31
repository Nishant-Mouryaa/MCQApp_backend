const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const textbookController = require('../controllers/textbookController');
const authMiddleware = require('../middleware/authMiddleware');

// Configure Multer storage and file filter
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure this folder exists or is created dynamically
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'textbook-' + uniqueSuffix + ext);
  }
});

const fileFilter = (req, file, cb) => {
  // Accept only PDF files
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed!'), false);
  }
};

const upload = multer({ storage, fileFilter });

// Routes
// Create textbook (upload new PDF)
router.post('/', authMiddleware, upload.single('pdf'), textbookController.createTextbook);

// Update textbook metadata (without file upload)
router.put('/:id', authMiddleware, textbookController.updateTextbook);

// Get all textbooks
router.get('/', textbookController.getAllTextbooks);

// Delete textbook
router.delete('/:id', authMiddleware, textbookController.deleteTextbook);

module.exports = router;
