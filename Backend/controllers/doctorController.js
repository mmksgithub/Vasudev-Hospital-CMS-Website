const Doctor = require('../models/doctorModel'); // Import the Doctor model

// Create a doctor
const createDoctor = async (req, res) => {
    try {
        const { name, qualification } = req.body;
        const photo = req.file.path; // Get photo path from uploaded file

        const newDoctor = new Doctor({
            name,
            qualification,
            photo,
        });

        await newDoctor.save();
        res.status(201).json(newDoctor); // Return the newly created doctor
    } catch (error) {
        console.error('Error creating doctor:', error);
        res.status(500).json({ message: 'Failed to create doctor' });
    }
};

// Get all doctors
const getDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.status(200).json(doctors); // Return the list of doctors
    } catch (error) {
        console.error('Error fetching doctors:', error);
        res.status(500).json({ message: 'Failed to fetch doctors' });
    }
};

// Delete a doctor
const deleteDoctor = async (req, res) => {
    try {
        const doctorId = req.params.id; // Get ID from request

        const deletedDoctor = await Doctor.findByIdAndDelete(doctorId);
        if (!deletedDoctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        res.status(200).json({ message: 'Doctor deleted successfully' }); // Confirm deletion
    } catch (error) {
        console.error('Error deleting doctor:', error);
        res.status(500).json({ message: 'Failed to delete doctor' });
    }
};

// Update a doctor
const updateDoctor = async (req, res) => {
    try {
        const doctorId = req.params.id; // Get ID from request
        const { name, qualification } = req.body; // Get updated values

        // Prepare the updated data





        
        const updatedData = { name, qualification };

        // If a new photo is uploaded, include it in the update
        if (req.file) {
            updatedData.photo = req.file.path; // Store the new photo path
        }

        // Update the doctor by ID
        const updatedDoctor = await Doctor.findByIdAndUpdate(doctorId, updatedData, { new: true });

        if (!updatedDoctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        res.status(200).json(updatedDoctor); // Return the updated doctor
    } catch (error) {
        console.error('Error updating doctor:', error);
        res.status(500).json({ message: 'Failed to update doctor' });
    }
};

module.exports = {
    createDoctor,
    getDoctors,
    deleteDoctor,
    updateDoctor,
};
