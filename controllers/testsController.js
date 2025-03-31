const Test = require('../models/Test');

// GET /api/tests
exports.getAllTests = async (req, res, next) => {
  try {
    const tests = await Test.find({});
    res.json(tests);
  } catch (error) {
    next(error);
  }
};

// POST /api/tests
exports.createTest = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { title, description, questions } = req.body;
    const newTest = await Test.create({ title, description, questions });
    res.status(201).json(newTest);
  } catch (error) {
    next(error);
  }
};

// PUT /api/tests/:id
exports.updateTest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedTest = await Test.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true }
    );
    if (!updatedTest) {
      return res.status(404).json({ message: 'Test not found' });
    }
    res.json(updatedTest);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/tests/:id
exports.deleteTest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedTest = await Test.findByIdAndDelete(id);
    if (!deletedTest) {
      return res.status(404).json({ message: 'Test not found' });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
