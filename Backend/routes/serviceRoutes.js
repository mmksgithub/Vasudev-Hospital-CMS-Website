const express = require('express'); 
const serviceController = require('../controllers/serviceController'); // Ensure correct path to the controller

const multer = require('multer');
const path = require('path');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Service routes
router.get('/', serviceController.getAllServices); // GET all services
router.post('/', upload.single('image'), serviceController.createService); // POST (create) service with image upload
router.put('/:id', upload.single('image'), serviceController.updateService); // PUT (update) service with image upload
router.delete('/:id', serviceController.deleteService); // DELETE service

module.exports = router;
