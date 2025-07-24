// routes/photoRoutes.js
const express = require('express');
const { createPhoto, getPhotos, deletePhoto, updatePhoto } = require('../controllers/photoController');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save files to the uploads folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
});

const upload = multer({ storage });

// Routes
router.post('/', upload.single('photo'), createPhoto); // Endpoint to add a photo
router.get('/', getPhotos); // Endpoint to get all photos
router.delete('/:id', deletePhoto); // Endpoint to delete a photo by ID
router.put('/:id', upload.single('photo'), updatePhoto); // Endpoint to update a photo

module.exports = router;
