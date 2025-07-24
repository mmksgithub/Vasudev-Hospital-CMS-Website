const Contact = require("../models/Contact");

// GET Contact Information
exports.getContact = async (req, res) => {
  try {
    const contact = await Contact.findOne(); // Assuming there is only one record
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch contact information" });
  }
};

// PUT Update Contact Information
exports.updateContact = async (req, res) => {
  try {
    const { city, state, address, pincode, primaryEmail, secondaryEmail, primaryContact, secondaryContact } = req.body;

    // Prepare updated data
    const updatedData = { city, state, address, pincode, primaryEmail, secondaryEmail, primaryContact, secondaryContact };

    const updatedContact = await Contact.findOneAndUpdate({}, updatedData, { new: true, upsert: true });
    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(500).json({ error: "Failed to update contact information" });
  }
};
