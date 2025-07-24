// models/Links.js
const mongoose = require('mongoose');

const LinksSchema = new mongoose.Schema({
  twitter: { type: String, required: true },
  facebook: { type: String, required: true },
  instagram: { type: String, required: true },
  linkedin: { type: String, required: true },
});

const Links = mongoose.model('Links', LinksSchema);

module.exports = Links;
