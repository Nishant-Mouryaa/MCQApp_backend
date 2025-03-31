module.exports = (err, req, res, next) => {
  console.error(err.stack);
  
  // Customize based on error type or error status
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    error: {
      message,
      // stack: err.stack // Only expose in dev environments
    }
  });
};
