require('dotenv').config(); // Loads environment variables from .env
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Routes
const authRoutes = require('./routes/authRoutes');
const testRoutes = require('./routes/testRoutes');
const textbookRoutes = require('./routes/textbookRoutes');
// const noteRoutes = require('./routes/noteRoutes'); // Uncomment if needed
const dashboardRoutes = require('./routes/dashboardRoutes');
// Add textbookRoutes, noteRoutes, etc. as needed

const app = express();

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/textbooks', textbookRoutes);
// app.use('/api/notes', noteRoutes);

// Error Handling Middleware (must be after routes)
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
