// models/AboutUs.js

const mongoose = require('mongoose');

const aboutUsSchema = new mongoose.Schema({
  header: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  vision: {
    type: String,
    required: true,
  },
  mission: {
    type: String,
    required: true,
  },
  image: {
    type: String, // URL of the image
    required: false, // Set to false to make it optional
  }
}, { timestamps: true }); // Add timestamps

const AboutUs = mongoose.model('AboutUs', aboutUsSchema);
module.exports = AboutUs;
