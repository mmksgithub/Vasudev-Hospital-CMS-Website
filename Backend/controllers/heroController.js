const Hero = require('../models/Hero');
const path = require('path');
const fs = require('fs');

// @desc Get all Hero sections
// @route GET /api/hero
// @access Public
const getHeroes = async (req, res) => {
  try {
    const heroes = await Hero.find(); // Get all hero sections
    res.json(heroes);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Create a new Hero section
// @route POST /api/hero
// @access Private
const createHero = async (req, res) => {
  try {
    const { header, description } = req.body;
    
    // Create a new Hero instance
    const newHero = new Hero({
      header,
      description,
      image: req.file ? req.file.filename : null, // Save the image filename if uploaded
    });

    await newHero.save();

    res.status(201).json(newHero);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create Hero section' });
  }
};

// @desc Update a Hero section
// @route PUT /api/hero/:id
// @access Private
const updateHero = async (req, res) => {
  try {
    const { header, description } = req.body;
    let hero = await Hero.findById(req.params.id);

    if (!hero) {
      return res.status(404).json({ message: 'Hero section not found' });
    }

    // Update the text fields
    hero.header = header || hero.header;
    hero.description = description || hero.description;

    // Check if an image is uploaded
    if (req.file) {
      // If a new image is uploaded, delete the old one
      if (hero.image) {
        const oldImagePath = path.join(__dirname, '../uploads/', hero.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      hero.image = req.file.filename; // Save the new image filename
    }

    await hero.save();

    res.json(hero);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update Hero section' });
  }
};

module.exports = {
  getHeroes,
  createHero,
  updateHero,
};
