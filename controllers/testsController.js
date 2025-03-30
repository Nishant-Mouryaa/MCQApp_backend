const Test = require('../models/Test');
const Question = require('../models/Question');

const getAllTests = async (req, res, next) => {
  try {
    const tests = await Test.find()
      .populate('questions')
      .sort({ createdAt: -1 });
    res.json(tests);
  } catch (err) {
    next(err);
  }
};

const createTest = async (req, res, next) => {
  try {
    const { title, description, duration, board, class: classLevel, subject } = req.body;
    
    const test = new Test({
      title,
      description,
      duration,
      board,
      class: classLevel,
      subject,
      createdBy: req.user.id
    });
    
    await test.save();
    res.status(201).json(test);
  } catch (err) {
    next(err);
  }
};

const getTest = async (req, res, next) => {
  try {
    const test = await Test.findById(req.params.id)
      .populate('questions');
      
    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }
    
    res.json(test);
  } catch (err) {
    next(err);
  }
};

const updateTest = async (req, res, next) => {
  try {
    const { title, description, duration, board, class: classLevel, subject } = req.body;
    
    const test = await Test.findByIdAndUpdate(
      req.params.id,
      { title, description, duration, board, class: classLevel, subject },
      { new: true, runValidators: true }
    );
    
    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }
    
    res.json(test);
  } catch (err) {
    next(err);
  }
};

const deleteTest = async (req, res, next) => {
  try {
    const test = await Test.findByIdAndDelete(req.params.id);
    
    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }
    
    // Delete associated questions
    await Question.deleteMany({ test: req.params.id });
    
    res.json({ message: 'Test deleted successfully' });
  } catch (err) {
    next(err);
  }
};

const addQuestion = async (req, res, next) => {
  try {
    const { questionText, options, correctAnswer, marks } = req.body;
    
    const question = new Question({
      questionText,
      options,
      correctAnswer,
      marks,
      test: req.params.id
    });
    
    await question.save();
    
    // Add question to test
    await Test.findByIdAndUpdate(
      req.params.id,
      { $push: { questions: question._id } }
    );
    
    res.status(201).json(question);
  } catch (err) {
    next(err);
  }
};

const updateQuestion = async (req, res, next) => {
  try {
    const { questionText, options, correctAnswer, marks } = req.body;
    
    const question = await Question.findByIdAndUpdate(
      req.params.qid,
      { questionText, options, correctAnswer, marks },
      { new: true, runValidators: true }
    );
    
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    
    res.json(question);
  } catch (err) {
    next(err);
  }
};

const deleteQuestion = async (req, res, next) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.qid);
    
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    
    // Remove question from test
    await Test.findByIdAndUpdate(
      req.params.id,
      { $pull: { questions: req.params.qid } }
    );
    
    res.json({ message: 'Question deleted successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllTests, createTest, getTest, updateTest, deleteTest,
  addQuestion, updateQuestion, deleteQuestion
};