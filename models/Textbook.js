const mongoose = require('mongoose');

const textbookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  board: {
    type: String,
    required: [true, 'Please select a board']
  },
  class: {
    type: String,
    required: [true, 'Please select a class']
  },
  subject: {
    type: String,
    required: [true, 'Please select a subject']
  },
  filePath: {
    type: String,
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Textbook', textbookSchema);