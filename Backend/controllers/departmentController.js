const Department = require('../models/Department');
const fs = require('fs');
const path = require('path');

// Get all departments
exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch departments.' });
  }
};

// Create a new department
exports.createDepartment = async (req, res) => {
  const { name, description } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!image) {
    return res.status(400).json({ message: 'Image is required.' });
  }

  try {
    const newDepartment = new Department({ name, description, image });
    await newDepartment.save();
    res.json(newDepartment);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create department.' });
  }
};

// Update an existing department
exports.updateDepartment = async (req, res) => {
  const { name, description } = req.body;
  const departmentId = req.params.id;

  try {
    const department = await Department.findById(departmentId);

    if (!department) {
      return res.status(404).json({ message: 'Department not found.' });
    }

    // Update the text fields
    department.name = name || department.name;
    department.description = description || department.description;

    // If a new image is uploaded, handle it
    if (req.file) {
      const oldImagePath = path.join(__dirname, '../uploads/', department.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath); // Delete the old image
      }
      department.image = req.file.filename; // Update with the new image
    }

    await department.save();
    res.json(department);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update department.' });
  }
};

// Delete a department
exports.deleteDepartment = async (req, res) => {
  const departmentId = req.params.id;

  try {
    const department = await Department.findById(departmentId);

    if (!department) {
      return res.status(404).json({ message: 'Department not found.' });
    }

    // Delete the image file from the server
    const imagePath = path.join(__dirname, '../uploads/', department.image);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath); // Delete the image
    }

    await department.remove();
    res.json({ message: 'Department deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete department.' });
  }
};
