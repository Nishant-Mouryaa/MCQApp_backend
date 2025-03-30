const Textbook = require('../models/Textbook');
const fs = require('fs');
const path = require('path');

const getAllTextbooks = async (req, res, next) => {
  try {
    const { board, class: classLevel, subject } = req.query;
    const filter = {};
    
    if (board) filter.board = board;
    if (classLevel) filter.class = classLevel;
    if (subject) filter.subject = subject;
    
    const textbooks = await Textbook.find(filter).sort({ createdAt: -1 });
    res.json(textbooks);
  } catch (err) {
    next(err);
  }
};

const uploadTextbook = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    const { title, description, board, class: classLevel, subject } = req.body;
    
    const textbook = new Textbook({
      title,
      description,
      board,
      class: classLevel,
      subject,
      filePath: req.file.path,
      fileName: req.file.originalname,
      fileSize: req.file.size,
      createdBy: req.user.id
    });
    
    await textbook.save();
    res.status(201).json(textbook);
  } catch (err) {
    next(err);
  }
};

const getTextbook = async (req, res, next) => {
  try {
    const textbook = await Textbook.findById(req.params.id);
    
    if (!textbook) {
      return res.status(404).json({ message: 'Textbook not found' });
    }
    
    res.json(textbook);
  } catch (err) {
    next(err);
  }
};

const updateTextbookMetadata = async (req, res, next) => {
  try {
    const { title, description, board, class: classLevel, subject } = req.body;
    
    const textbook = await Textbook.findByIdAndUpdate(
      req.params.id,
      { title, description, board, class: classLevel, subject },
      { new: true, runValidators: true }
    );
    
    if (!textbook) {
      return res.status(404).json({ message: 'Textbook not found' });
    }
    
    res.json(textbook);
  } catch (err) {
    next(err);
  }
};

const deleteTextbook = async (req, res, next) => {
  try {
    const textbook = await Textbook.findByIdAndDelete(req.params.id);
    
    if (!textbook) {
      return res.status(404).json({ message: 'Textbook not found' });
    }
    
    // Delete the file
    fs.unlink(textbook.filePath, (err) => {
      if (err) console.error('Error deleting file:', err);
    });
    
    res.json({ message: 'Textbook deleted successfully' });
  } catch (err) {
    next(err);
  }
};

const downloadTextbook = async (req, res, next) => {
  try {
    const textbook = await Textbook.findById(req.params.id);
    
    if (!textbook) {
      return res.status(404).json({ message: 'Textbook not found' });
    }
    
    if (!fs.existsSync(textbook.filePath)) {
      return res.status(404).json({ message: 'File not found' });
    }
    
    res.download(textbook.filePath, textbook.fileName);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllTextbooks, uploadTextbook, getTextbook,
  updateTextbookMetadata, deleteTextbook, downloadTextbook
};