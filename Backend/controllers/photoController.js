// controllers/photoController.js
const Photo = require('../models/photoModel');

// Create a photo
const createPhoto = async (req, res) => {
    try {
        const filePath = req.file.path; // Get photo path from uploaded file

        const newPhoto = new Photo({
            filePath,
        });

        await newPhoto.save();
        res.status(201).json(newPhoto); // Return the newly created photo
    } catch (error) {
        console.error('Error creating photo:', error);
        res.status(500).json({ message: 'Failed to create photo' });
    }
};

// Get all photos
const getPhotos = async (req, res) => {
    try {
        const photos = await Photo.find();
        res.status(200).json(photos); // Return the list of photos
    } catch (error) {
        console.error('Error fetching photos:', error);
        res.status(500).json({ message: 'Failed to fetch photos' });
    }
};

// Delete a photo
const deletePhoto = async (req, res) => {
    try {
        const photoId = req.params.id;

        const deletedPhoto = await Photo.findByIdAndDelete(photoId);
        if (!deletedPhoto) {
            return res.status(404).json({ message: 'Photo not found' });
        }

        res.status(200).json({ message: 'Photo deleted successfully' });
    } catch (error) {
        console.error('Error deleting photo:', error);
        res.status(500).json({ message: 'Failed to delete photo' });
    }
};

// Update a photo
const updatePhoto = async (req, res) => {
    try {
        const photoId = req.params.id;
        const filePath = req.file ? req.file.path : req.body.filePath;

        const updatedPhoto = await Photo.findByIdAndUpdate(photoId, { filePath }, { new: true });
        if (!updatedPhoto) {
            return res.status(404).json({ message: 'Photo not found' });
        }

        res.status(200).json(updatedPhoto);
    } catch (error) {
        console.error('Error updating photo:', error);
        res.status(500).json({ message: 'Failed to update photo' });
    }
};

module.exports = {
    createPhoto,
    getPhotos,
    deletePhoto,
    updatePhoto,
};
