const Textbook = require('../models/Textbook');

// POST /api/textbooks - Create a new textbook
exports.createTextbook = async (req, res, next) => {
  try {
    // Multer will place file info in req.file
    const { title, board, subject } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: 'PDF file is required' });
    }

    const textbook = await Textbook.create({
      title,
      board,
      subject,
      filePath: req.file.filename, // Store the filename in the database
    });

    res.status(201).json(textbook);
  } catch (error) {
    next(error);
  }
};

// GET /api/textbooks - Retrieve all textbooks
exports.getAllTextbooks = async (req, res, next) => {
  try {
    const textbooks = await Textbook.find({});
    res.json(textbooks);
  } catch (error) {
    next(error);
  }
};

// PUT /api/textbooks/:id - Update textbook metadata
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

// DELETE /api/textbooks/:id - Delete a textbook
exports.deleteTextbook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Textbook.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Textbook not found' });
    }
    // Optionally: remove the file from the filesystem
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
