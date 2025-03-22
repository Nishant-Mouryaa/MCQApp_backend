const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('config'); // For managing configuration (e.g., port, MongoDB URI)
const testsRoutes = require('./routes/tests');
const textbooksRoutes = require('./routes/textbooks');
const notesRoutes = require('./routes/notes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(cors());
// Middleware for parsing JSON requests
app.use(express.json());

// Connect to MongoDB using Mongoose
const dbURI = config.get('mongoURI') || 'mongodb+srv://nishantmourya2005:8VbzXSNsYnMJz50h@cluster0.tqnvc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define API routes
app.use('/api/tests', testsRoutes);
app.use('/api/textbooks', textbooksRoutes);
app.use('/api/notes', notesRoutes);

// Error handling middleware (should be the last middleware)
app.use(errorHandler);

// Start the server on a configurable port
const PORT = process.env.PORT || config.get('port') || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
