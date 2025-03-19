const Note = require('../models/Note');

// GET /api/notes
exports.getAllNotes = async (req, res, next) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    next(err);
  }
};

// POST /api/notes
exports.createNote = async (req, res, next) => {
  try {
    const newNote = new Note(req.body);
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (err) {
    next(err);
  }
};

// PUT /api/notes/:id
exports.updateNote = async (req, res, next) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedNote) return res.status(404).json({ message: 'Note not found' });
    res.json(updatedNote);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/notes/:id
exports.deleteNote = async (req, res, next) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) return res.status(404).json({ message: 'Note not found' });
    res.json({ message: 'Note deleted successfully' });
  } catch (err) {
    next(err);
  }
};
