const { body, validationResult } = require('express-validator');

// Validation rules configuration
const validations = {
  testValidation: [
    body('title').notEmpty().withMessage('Title is required'),
    // Additional validations for test questions, description etc.
  ],
  textbookValidation: [
    body('title').notEmpty().withMessage('Title is required'),
    body('pdfUrl').isURL().withMessage('Valid PDF URL is required')
  ],
  noteValidation: [
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required')
  ]
};

// Middleware factory that runs validation rules and returns errors if any
module.exports = (validationKey) => {
  const rules = validations[validationKey] || [];
  return [
    ...rules,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ];
};
