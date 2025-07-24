const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  city: { type: String, required: true },
  state: { type: String, required: true },
  address: { type: String, required: true },
  pincode: { type: String, required: true },
  primaryEmail: { type: String, required: true },
  secondaryEmail: { type: String },
  primaryContact: { type: String, required: true },
  secondaryContact: { type: String },
});

const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;
