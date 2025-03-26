const Test = require('../models/Test');

// GET /api/tests/:testId/questions
exports.getQuestions = async (req, res, next) => {
  try {
    const test = await Test.findById(req.params.testId);
    if (!test) return res.status(404).json({ message: 'Test not found' });
    res.json(test.questions);
  } catch (err) {
    console.error('Error in getQuestions:', err);
    next(err);
  }
};

// POST /api/tests/:testId/questions
exports.createQuestion = async (req, res, next) => {
  try {
    const { testId } = req.params;
    const test = await Test.findById(testId);
    if (!test) return res.status(404).json({ message: 'Test not found' });

    // Create new question from request body.
    // Expected fields in req.body: questionText, options (array), correctAnswer, etc.
    const newQuestion = req.body;
    test.questions.push(newQuestion);
    await test.save();
    
    // Return the newly added question (the last one in the array)
    res.status(201).json(test.questions[test.questions.length - 1]);
  } catch (err) {
    console.error('Error in createQuestion:', err);
    next(err);
  }
};

// PUT /api/questions/:id
exports.updateQuestion = async (req, res, next) => {
  try {
    const { id } = req.params; // ID of the question
    // Find the test document that contains this question
    const test = await Test.findOne({ 'questions._id': id });
    if (!test) return res.status(404).json({ message: 'Question not found' });
    
    // Get the question subdocument and update its fields from req.body
    const question = test.questions.id(id);
    question.set(req.body);
    await test.save();
    
    res.json(question);
  } catch (err) {
    console.error('Error in updateQuestion:', err);
    next(err);
  }
};

// DELETE /api/questions/:id
exports.deleteQuestion = async (req, res, next) => {
  try {
    const { id } = req.params; // ID of the question
    // Find the test containing the question
    const test = await Test.findOne({ 'questions._id': id });
    if (!test) return res.status(404).json({ message: 'Question not found' });
    
    // Remove the question subdocument and save the test
    test.questions.id(id).remove();
    await test.save();
    
    res.json({ message: 'Question deleted successfully' });
  } catch (err) {
    console.error('Error in deleteQuestion:', err);
    next(err);
  }
};
