const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  header: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String, // This will store the filename of the uploaded image
    required: true,
  },
});

module.exports = mongoose.model('Service', serviceSchema);
