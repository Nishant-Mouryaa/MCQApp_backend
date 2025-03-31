const mongoose = require('mongoose');

const textbookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  board: { type: String },
  subject: { type: String },
  filePath: { type: String }, // Path to the uploaded PDF file
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Textbook', textbookSchema);
