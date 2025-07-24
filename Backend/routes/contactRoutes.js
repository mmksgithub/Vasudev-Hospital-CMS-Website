const express = require("express");
const { getContact, updateContact } = require("../controllers/contactController");
const router = express.Router();

// GET: Fetch contact data
router.get("/", getContact);

// PUT: Update contact data
router.put('/', updateContact); // Use the controller function directly

module.exports = router;
