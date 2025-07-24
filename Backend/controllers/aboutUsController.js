const AboutUs = require('../models/AboutUs');
const path = require('path');
const fs = require('fs');

// Get the current About Us data
const getAboutUs = async (req, res) => {
  try {
    const aboutUs = await AboutUs.findOne(); // Get the first About Us entry
    res.status(200).json(aboutUs);
  } catch (error) {
    console.error("Error fetching About Us data:", error);
    res.status(500).json({ message: "Error fetching About Us data", error });
  }
};

// Update the About Us data
const updateAboutUs = async (req, res) => {
  try {
    const { header, description, vision, mission } = req.body;
    const image = req.file ? req.file.filename : null; // Only the filename

    // Fetch the current About Us entry
    const currentAboutUs = await AboutUs.findOne();

    // Prepare updated data
    const updatedData = { header, description, vision, mission };

    // If a new image is uploaded, handle image update
    if (image) {
      if (currentAboutUs && currentAboutUs.image) {
        const oldImagePath = path.join(__dirname, '..', 'uploads', currentAboutUs.image);
        // Delete the old image file
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath); // Synchronously delete the old image
        }
      }
      updatedData.image = image; // Save only the filename in the DB
    }

    // Update the About Us entry in the database
    const updatedAboutUs = await AboutUs.findOneAndUpdate({}, updatedData, { new: true });

    res.status(200).json(updatedAboutUs);
  } catch (error) {
    console.error("Error updating About Us data:", error);
    res.status(500).json({ message: "Error updating About Us data", error });
  }
};

// Export the functions
module.exports = { getAboutUs, updateAboutUs };
