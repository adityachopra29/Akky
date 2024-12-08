const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Configure multer for file storage
const upload = multer({
  dest: 'uploads/', // Temporary directory for storing files
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit files to 10MB
});

// Endpoint to handle file uploads
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  // Rename the file for better management (optional)
  const newFilePath = path.join('uploads', req.file.originalname);
  fs.renameSync(req.file.path, newFilePath);

  console.log(`File uploaded: ${newFilePath}`);
  res.send({ message: 'File uploaded successfully', filePath: newFilePath });
});

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the File Upload Server!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
