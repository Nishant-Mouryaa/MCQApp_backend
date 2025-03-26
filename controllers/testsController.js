const Test = require('../models/Test');

// GET /api/tests
exports.getAllTests = async (req, res, next) => {
  try {
    const tests = await Test.find();
    res.json(tests);
  } catch (err) {
    next(err);
  }
};

// POST /api/tests
exports.createTest = async (req, res, next) => {
  try {
    const newTest = new Test(req.body);
    const savedTest = await newTest.save();
    res.status(201).json(savedTest);
  } catch (err) {
    next(err);
  }
};

// PUT /api/tests/:id
exports.updateTest = async (req, res, next) => {
  try {
    const updatedTest = await Test.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedTest) return res.status(404).json({ message: 'Test not found' });
    res.json(updatedTest);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/tests/:id
exports.deleteTest = async (req, res, next) => {
  try {
    const deletedTest = await Test.findByIdAndDelete(req.params.id);
    if (!deletedTest) return res.status(404).json({ message: 'Test not found' });
    res.json({ message: 'Test deleted successfully' });
  } catch (err) {
    next(err);
  }
};

// Optional: GET /api/tests/:id/questions
// controllers/testsController.js
exports.getTestQuestions = async (req, res, next) => {
  try {
    const testId = req.params.id;
    if (!testId) {
      return res.status(400).json({ message: 'Test ID is required' });
    }
    const test = await Test.findById(testId);
    if (!test) return res.status(404).json({ message: 'Test not found' });
    res.json(test.questions);
  } catch (err) {
    next(err);
  }
};

