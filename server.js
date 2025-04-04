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
const noteRoutes = require('./routes/noteRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const protectedRoutes = require('./routes/protected');


const fs = require('fs');
const path = require('path');

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true }); // Add recursive flag
  console.log('Uploads directory created at:', uploadsDir); // Debug path
}

if (process.env.RENDER) {
  const renderUploadsDir = '/opt/render/project/uploads';
  if (!fs.existsSync(renderUploadsDir)) {
    fs.mkdirSync(renderUploadsDir, { recursive: true });
    console.log('Created Render.com uploads directory');
  }
}


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
app.use('/api/notes', noteRoutes);
app.use('/api/protected', protectedRoutes); // Protected routes for file delivery

// Error Handling Middleware (must be after routes)
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
