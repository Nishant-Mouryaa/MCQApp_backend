// routes/protected.js
const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

router.get('/:filename', (req, res) => {
  try {
    // Security: Prevent directory traversal
    const safeFilename = path.normalize(req.params.filename).replace(/^(\.\.(\/|\\|$))+/g, '');
    const filePath = path.join(__dirname, '../uploads', safeFilename);

    // Verify file exists
    if (!fs.existsSync(filePath)) {
      console.error('File not found:', filePath); // Debug log
      return res.status(404).json({ error: 'File not found' });
    }

    // Set proper headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="document.pdf"');
    res.setHeader('Cache-Control', 'no-store');

    // Stream the file
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
    
  } catch (error) {
    console.error('File delivery error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;