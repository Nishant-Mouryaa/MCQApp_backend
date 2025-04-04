// controllers/testsController.js
const Test = require('../models/Test');

// GET /api/tests - Retrieve all tests
// GET /api/tests - Retrieve all tests
exports.getAllTests = async (req, res) => {
  try {
    console.log('User ID making request:', req.user.userId);
    
    // Move the tests query to the top
    const tests = await Test.find({})
      .select('title description questions createdAt')
      .lean();
    
    console.log('Found tests:', tests.length); // Now this will work
    
    if (!tests.length) {
      return res.status(404).json({ message: 'No tests found' });
    }

    const formattedTests = tests.map(test => ({
      ...test,
      questionsCount: test.questions.length,
      id: test._id.toString()
    }));

    res.json(formattedTests);
  } catch (error) {
    console.error('Error details:', {
      error: error.message,
      stack: error.stack,
      query: Test.find({}).toString()
    });
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// POST /api/tests - Create a new test
exports.createTest = async (req, res) => {
  try {
    const { title, description } = req.body;
    
    // Create test with empty questions array
    const test = new Test({
      title,
      description,
      questions: [] // Explicitly set empty array
    });

    await test.save();
    res.status(201).json(test);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// PUT /api/tests/:id - Update an existing test
exports.updateTest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedTest = await Test.findByIdAndUpdate(
      id,
      { ...req.body, updatedAt: Date.now() },
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

// DELETE /api/tests/:id - Delete a test
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

// POST /api/tests/:id/questions - Add a new question to a test
exports.addQuestion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { questionText, options, correctAnswer } = req.body;
    const test = await Test.findById(id);
    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }
    const question = { questionText, options, correctAnswer };
    test.questions.push(question);
    await test.save();
    // Return the newly added question (it will have an _id)
    res.status(201).json(test.questions[test.questions.length - 1]);
  } catch (error) {
    next(error);
  }
};

// PUT /api/tests/:id/questions/:questionId - Update a question in a test
exports.updateQuestion = async (req, res, next) => {
  try {
    const { id, questionId } = req.params;
    const { questionText, options, correctAnswer } = req.body;
    const test = await Test.findById(id);
    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }
    const question = test.questions.id(questionId);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    question.questionText = questionText;
    question.options = options;
    question.correctAnswer = correctAnswer;
    await test.save();
    res.json(question);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/tests/:id/questions/:questionId - Delete a question from a test
exports.deleteQuestion = async (req, res, next) => {
  try {
    const { id, questionId } = req.params;
    const test = await Test.findById(id);
    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }
    const question = test.questions.id(questionId);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    question.remove();
    await test.save();
    res.json({ message: 'Question deleted successfully' });
  } catch (error) {
    next(error);
  }
};

exports.submitTestResults = async (req, res) => {
  try {
    const { testId, score, totalQuestions, answers } = req.body;
    
    const testResult = new TestResult({
      user: req.user.userId,
      test: testId,
      score,
      totalQuestions,
      answers
    });

    await testResult.save();
    
    res.status(201).json(testResult);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
