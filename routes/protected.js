const express = require('express');
const path = require('path');
const fs = require('fs');
const { authenticate, authorizeTextbookAccess } = require('../middleware/auth');
const router = express.Router();

router.get('/:filename', 
  authenticate,
  authorizeTextbookAccess,
  async (req, res) => {
    try {
      const { filename } = req.params;
      const { textbook } = req; // From authorizeTextbookAccess
      
      // Security: Prevent directory traversal
      const safeFilename = path.normalize(filename).replace(/^(\.\.(\/|\\|$))+/g, '');
      const filePath = path.join(__dirname, '../uploads', safeFilename);

      // Verify file exists
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: 'File not found' });
      }

      // Set security headers
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'inline; filename="protected.pdf"');
      res.setHeader('Cache-Control', 'no-store, max-age=0');
      res.setHeader('X-Content-Type-Options', 'nosniff');
      
      // Optional: Add watermark for tracking
      if (process.env.ENABLE_WATERMARK === 'true') {
        // Implement your PDF watermarking logic here
        // Or use a service like PDF-lib to dynamically add watermarks
      }

      // Stream the file
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
      
      // Log access
      console.log(`User ${req.user.userId} accessed ${filename}`);

    } catch (error) {
      console.error('File delivery error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
);

module.exports = router;