const mongoose = require('mongoose');

const textbookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  board: { type: String },
  subject: { type: String },
  filePath: { type: String }, // path to the uploaded PDF
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Textbook', textbookSchema);
