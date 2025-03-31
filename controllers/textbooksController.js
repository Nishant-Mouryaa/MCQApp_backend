const Textbook = require('../models/Textbook');

// POST /api/textbooks
exports.createTextbook = async (req, res, next) => {
  try {
    // req.file contains Multer info (filename, path, etc.)
    const { title, board, subject } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: 'PDF file is required' });
    }

    const textbook = await Textbook.create({
      title,
      board,
      subject,
      filePath: req.file.path
    });

    res.status(201).json(textbook);
  } catch (error) {
    next(error);
  }
};

// GET /api/textbooks
exports.getAllTextbooks = async (req, res, next) => {
  try {
    const textbooks = await Textbook.find({});
    res.json(textbooks);
  } catch (error) {
    next(error);
  }
};

// PUT /api/textbooks/:id
exports.updateTextbook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await Textbook.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Textbook not found' });
    }
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/textbooks/:id
exports.deleteTextbook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Textbook.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Textbook not found' });
    }
    // Optionally remove the file from the filesystem or storage
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
