const Textbook = require('../models/Textbook');

// GET /api/textbooks
exports.getAllTextbooks = async (req, res, next) => {
  try {
    const textbooks = await Textbook.find();
    res.json(textbooks);
  } catch (err) {
    next(err);
  }
};

// POST /api/textbooks
exports.createTextbook = async (req, res, next) => {
  try {
    const newTextbook = new Textbook(req.body);
    const savedTextbook = await newTextbook.save();
    res.status(201).json(savedTextbook);
  } catch (err) {
    next(err);
  }
};

// PUT /api/textbooks/:id
exports.updateTextbook = async (req, res, next) => {
  try {
    const updatedTextbook = await Textbook.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedTextbook) return res.status(404).json({ message: 'Textbook not found' });
    res.json(updatedTextbook);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/textbooks/:id
exports.deleteTextbook = async (req, res, next) => {
  try {
    const deletedTextbook = await Textbook.findByIdAndDelete(req.params.id);
    if (!deletedTextbook) return res.status(404).json({ message: 'Textbook not found' });
    res.json({ message: 'Textbook deleted successfully' });
  } catch (err) {
    next(err);
  }
};
