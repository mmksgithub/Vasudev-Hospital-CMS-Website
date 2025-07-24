const mongoose = require("mongoose");

const heroSchema = new mongoose.Schema(
  {
    header: {
      type: String,
      required: [true, "Header is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    image: {
      type: String, // Will store the path to the image
      required: false,
    },
  },
  { timestamps: true }
); // Adds createdAt and updatedAt fields automatically

const Hero = mongoose.model("Hero", heroSchema);

module.exports = Hero;
