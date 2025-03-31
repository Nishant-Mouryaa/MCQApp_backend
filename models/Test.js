const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [{ type: String }],            // e.g., multiple-choice options
  correctAnswer: { type: String, required: true }
}, { _id: false });

const testSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  questions: [questionSchema], // Embedded questions
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Test', testSchema);
