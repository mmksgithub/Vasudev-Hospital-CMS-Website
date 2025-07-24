const express = require('express');
const { createDoctor, getDoctors, deleteDoctor, updateDoctor } = require('../controllers/doctorController');
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
router.post('/', upload.single('photo'), createDoctor); // Endpoint to add a doctor
router.get('/', getDoctors); // Endpoint to get all doctors
router.delete('/:id', deleteDoctor); // Endpoint to delete a doctor by ID
router.put('/:id', upload.single('photo'), updateDoctor); // Endpoint to update a doctor

module.exports = router;
