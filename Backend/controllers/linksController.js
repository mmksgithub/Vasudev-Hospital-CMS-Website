// controllers/linksController.js
const Links = require('../models/Links');

// @desc    Get social media links
// @route   GET /api/links
// @access  Public
const getLinks = async (req, res) => {
  try {
    const links = await Links.findOne();
    if (!links) {
      return res.status(404).json({ message: 'Links not found' });
    }
    res.json(links);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update social media links
// @route   PUT /api/links
// @access  Public (change to Private with auth middleware if needed)
const updateLinks = async (req, res) => {
  const { twitter, facebook, instagram, linkedin } = req.body;

  try {
    let links = await Links.findOne();
    
    if (!links) {
      links = new Links({ twitter, facebook, instagram, linkedin });
    } else {
      links.twitter = twitter;
      links.facebook = facebook;
      links.instagram = instagram;
      links.linkedin = linkedin;
    }

    await links.save();
    res.json({ message: 'Links updated successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getLinks, updateLinks };
