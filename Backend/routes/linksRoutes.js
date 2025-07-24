// routes/linksRoutes.js
const express = require('express');
const router = express.Router();
const { getLinks, updateLinks } = require('../controllers/linksController');

// Route to get the current social links
router.get('/', getLinks);

// Route to update the social links
router.put('/', updateLinks);

module.exports = router;
