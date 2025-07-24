const Service = require('../models/Service');
const fs = require('fs');
const path = require('path');

// Get all services
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch services.' });
  }
};

// Create a new service
exports.createService = async (req, res) => {
  const { header, description } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!image) {
    return res.status(400).json({ message: 'Image is required.' });
  }

  try {
    const newService = new Service({ header, description, image });
    await newService.save();
    res.json(newService);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create service.' });
  }
};

// Update an existing service
exports.updateService = async (req, res) => {
  const { header, description } = req.body;
  const serviceId = req.params.id;

  try {
    const service = await Service.findById(serviceId);

    if (!service) {
      return res.status(404).json({ message: 'Service not found.' });
    }

    // Update the text fields
    service.header = header || service.header;
    service.description = description || service.description;

    // If a new image is uploaded, handle it
    if (req.file) {
      const oldImagePath = path.join(__dirname, '../uploads/', service.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath); // Delete the old image
      }
      service.image = req.file.filename; // Update with the new image
    }

    await service.save();
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update service.' });
  }
};

// Delete a service
exports.deleteService = async (req, res) => {
  const serviceId = req.params.id;

  try {
    const service = await Service.findById(serviceId);

    if (!service) {
      return res.status(404).json({ message: 'Service not found.' });
    }

    // Delete the image file from the server
    const imagePath = path.join(__dirname, '../uploads/', service.image);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath); // Delete the image
    }

    await service.remove();
    res.json({ message: 'Service deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete service.' });
  }
};
