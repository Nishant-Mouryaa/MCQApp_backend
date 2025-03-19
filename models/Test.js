const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  questions: [
    {
      questionText: { type: String, required: true },
      options: [{ type: String }],
      correctAnswer: { type: String }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Test', TestSchema);
