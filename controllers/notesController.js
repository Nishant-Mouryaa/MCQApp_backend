const Note = require('../models/Note');

const getAllNotes = async (req, res, next) => {
  try {
    const { board, class: classLevel, subject } = req.query;
    const filter = {};
    
    if (board) filter.board = board;
    if (classLevel) filter.class = classLevel;
    if (subject) filter.subject = subject;
    
    const notes = await Note.find(filter).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    next(err);
  }
};

const createNote = async (req, res, next) => {
  try {
    const { title, content, board, class: classLevel, subject } = req.body;
    
    const note = new Note({
      title,
      content,
      board,
      class: classLevel,
      subject,
      createdBy: req.user.id
    });
    
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    next(err);
  }
};

const getNote = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    
    res.json(note);
  } catch (err) {
    next(err);
  }
};

const updateNote = async (req, res, next) => {
  try {
    const { title, content, board, class: classLevel, subject } = req.body;
    
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content, board, class: classLevel, subject },
      { new: true, runValidators: true }
    );
    
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    
    res.json(note);
  } catch (err) {
    next(err);
  }
};

const deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    
    res.json({ message: 'Note deleted successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllNotes, createNote, getNote, updateNote, deleteNote
};