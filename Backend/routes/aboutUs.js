const express = require('express');
const router = express.Router();
const { getAboutUs, updateAboutUs } = require('../controllers/aboutUsController');
const multer = require('multer'); // For handling file uploads

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Define the upload directory
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Keep original file name
  }
});
const upload = multer({ storage: storage });

// Route to get About Us data
router.get('/', getAboutUs);

// Route to update About Us data with image upload
router.put('/', upload.single('image'), updateAboutUs);

module.exports = router;