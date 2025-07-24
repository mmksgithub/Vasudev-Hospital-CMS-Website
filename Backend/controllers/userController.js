const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/User");
const dotenv = require("dotenv");
const path = require("path");


// Load environment variablesauth
dotenv.config({ path: path.join(__dirname, "../config.env") });

// Signup logic
const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password and create a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    return res
      .status(201)
      .json({ status: true, message: "User registered successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error during signup", error });
  }
};

// Login logic
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ status: false, message: "User is not registered" });
    }

    // Validate the password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ status: false, message: "Password is incorrect" });
    }

    // Create a token
    const token = jwt.sign({ username: user.username }, process.env.KEY, {
      expiresIn: "1h",
    });
    res.cookie("token", token, { maxAge: 3600000, sameSite: process.env.NODE_ENV === "production", 
  secure: true,  }); // 1 hour expiration
    return res.status(200).json({ status: true, message: "Login successful", token }); // Include token in response
  } catch (error) {
    return res.status(500).json({ message: "Server error during login", error });
  }
};

// Forgot password logic
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not registered" });
    }

    // Create a reset token
    const token = jwt.sign({ id: user._id }, process.env.KEY, {
      expiresIn: "5m",
    });

    // Configure nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Reset Password",
     html: `<p>Click the link below to reset your password:</p>
         <a href="https://admin.vasudevhealthcare.com/resetPassword/${token}">
           Reset Password
         </a>`,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        return res.status(500).json({ message: "Error sending email" });
      }
      return res.status(200).json({ status: true, message: "Email sent" });
    });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred", error });
  }
};

// Reset password logic
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.KEY);
    const userId = decoded.id;

    // Hash new password and update user
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(userId, { password: hashedPassword });
    return res.status(200).json({ status: true, message: "Password updated" });
  } catch (error) {
    return res.status(400).json({ message: "Invalid token", error });
  }
};

// Verify user middleware
const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ status: false, message: "no token" });
    }
    const decoded = jwt.verify(token, process.env.KEY);
 req.body.userId = decoded.id;  
 next();
  } catch (err) {
   console.log(error)
        res.json({ success: false, message: error.message });
  }
};



// Logout logic
const logout = (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ status: true, message: "Logout successful" });
};

// Export the functions using CommonJS syntax
module.exports = {
  signup,
  login,
  forgotPassword,
  resetPassword,
  verifyUser,
  logout,
};
