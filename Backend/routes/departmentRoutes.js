const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');
const multer = require('multer');

// Set up multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Destination folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique file name
  },
});

const upload = multer({ storage });

// Routes for departments
router.get('/', departmentController.getAllDepartments);
router.post('/', upload.single('image'), departmentController.createDepartment);
router.put('/:id', upload.single('image'), departmentController.updateDepartment);
router.delete('/:id', departmentController.deleteDepartment);

module.exports = router;
