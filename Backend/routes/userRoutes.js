const express = require('express'); 
const { signup, login, forgotPassword, resetPassword, verifyUser, logout } = require("../controllers/userController.js");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// Protect the dashboard route using verifyUser middleware

// Route to verify if the user is authenticated
router.get("/verify", verifyUser, (req, res) => {
  return res.json({ status: true, message: "Authorized" });
});

router.get("/logout", logout);

module.exports = router;
