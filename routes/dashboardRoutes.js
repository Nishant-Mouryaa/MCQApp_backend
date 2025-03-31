const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

// Import your models
const Test = require('../models/Test');
const Textbook = require('../models/Textbook');
const Note = require('../models/Note');

// GET /api/dashboard/metrics
router.get('/metrics', authMiddleware, async (req, res, next) => {
  try {
    const testCount = await Test.countDocuments();
    const textbookCount = await Textbook.countDocuments();
    const noteCount = await Note.countDocuments();

    // You can also fetch recent items if desired
    const recentTests = await Test.find().sort({ createdAt: -1 }).limit(5);
    
    res.json({
      testCount,
      textbookCount,
      noteCount,
      recentTests
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
