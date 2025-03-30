const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: [true, 'Please provide question text'],
    trim: true
  },
  options: [{
    type: String,
    required: [true, 'Please provide options']
  }],
  correctAnswer: {
    type: String,
    required: [true, 'Please provide correct answer']
  },
  marks: {
    type: Number,
    required: [true, 'Please provide marks'],
    min: 1
  },
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Test',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Question', questionSchema);