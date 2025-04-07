// models/Test.js
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: [true, 'Question text is required'],
    trim: true
  },
  options: {
    type: [String],
    required: [true, 'Options are required'],
    validate: {
      validator: function(options) {
        return options.length >= 2; // At least 2 options
      },
      message: 'At least 2 options are required'
    }
  },
  correctAnswer: {
    type: Number, // Store as index
    required: [true, 'Correct answer is required'],
    min: 0
  }
});

const testSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  questions: {type: [questionSchema], default: []},
  createdAt: { type: Date, default: Date.now }
});

const testResultSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Test',
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  answers: {
    type: Object,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


const Test = mongoose.model('Test', testSchema);
const TestResult = mongoose.model('TestResult', testResultSchema);
const Question = mongoose.model('Question', questionSchema);

module.exports = { Test, TestResult, Question };
