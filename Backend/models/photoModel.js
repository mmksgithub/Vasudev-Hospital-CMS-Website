// models/photoModel.js
const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    filePath: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
