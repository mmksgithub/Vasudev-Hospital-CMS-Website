const express = require('express');
const { getHeroes, createHero, updateHero } = require('../controllers/heroController');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save files to the uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Generate unique filename
  },
});

const upload = multer({ storage });

// Routes
router.get('/', getHeroes); // Get all hero sections
router.post('/', upload.single('image'), createHero); // POST /api/hero
router.put('/:id', upload.single('image'), updateHero); // PUT /api/hero/:id

module.exports = router;
