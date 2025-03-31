// routes/testRoutes.js
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authMiddleware = require('../middleware/auth');
const testController = require('../controllers/testsController');

router.post('/',
  authMiddleware,
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('questions').isArray().withMessage('Questions must be an array')
  ],
  testController.createTest
);

module.exports = router;