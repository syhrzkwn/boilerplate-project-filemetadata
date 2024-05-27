var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer = require('multer');
const path = require('path');

var app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Web Routes
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// API Routes
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const fileMetadata = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  };

  res.json(fileMetadata);
});

// Debug
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
