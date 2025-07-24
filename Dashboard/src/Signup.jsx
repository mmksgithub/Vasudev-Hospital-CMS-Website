import React, { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';  // Import toastify styles
import { Box, Button, TextField, IconButton, InputAdornment, useTheme } from "@mui/material"; // Import MUI components
import { Visibility, VisibilityOff } from "@mui/icons-material";  // Icons for eye toggle
import { tokens } from "./theme";  // Import tokens for theme-based styling
import logo from "./assets/images/vasudev-logo-rb.png";
import config from "../env";


const Signup = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode); // Access theme colors

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility

  const navigate = useNavigate();

  // Toggle password visibility
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validation
    if (!username || !email || !password) {
      toast.error("Please fill in all fields!", {
        position: "top-center",
        autoClose: 3000,
      });
      return; // Stop form submission
    }

    // Proceed with signup if all fields are filled
    Axios.post(`${config.PROJECT_URL}/api/users/signup`, {
      username,
      password,
      email,
    }, {
      withCredentials: true // Ensures cookies are sent
    })
    .then(response => {
      if (response.data.status) {
        toast.success("Signup successful!", {
          position: "top-center",
          autoClose: 2000,
        });

        // Redirect to login after a short delay
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    })
    .catch(err => {
      console.log(err);
      toast.error("Error during signup. Please try again!", {
        position: "top-center",
        autoClose: 3000,
      });
    });
  };

  return (
    <Box m="20px">
      <ToastContainer position="top-center" />
      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap="20px"
        sx={{
          backgroundColor: "#E9FFFD",
          padding: "40px",
          borderRadius: "8px",
          maxWidth: "600px", // Adjust as per your requirement
          margin: "auto",

          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          marginTop: "0",
          fontFamily:"Figtree", 
        }}
      >
        <img
          style={{
            width: "100%", // Set to 100% to make it responsive
            maxWidth: "500px", // Maintain max width so it doesn't overflow
            height: "130px",
            borderRadius: "5px",
          }}
          src={logo}
          alt="Logo"
        />

        {/* Signup Title */}
        <h2 style={{ color: colors.gray[100], fontSize: "24px", fontWeight: "bold",fontFamily:"Figtree",  }}>Sign Up</h2>

        {/* Username Field */}
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin="dense"
          InputLabelProps={{
            shrink: true,
            style: { color: colors.gray[100], fontSize: "18px",fontFamily:"Figtree",  },
          }}
          sx={{
            "& .MuiInputBase-input": {
              color: colors.gray[100],
              fontSize: "17px",fontFamily:"Figtree", 
            },
            "& .MuiOutlinedInput-root fieldset": {
              borderColor: colors.primary[200],
              fontSize: "17px",fontFamily:"Figtree", 
            },
          }}
        />

        {/* Email Field */}
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="dense"
          InputLabelProps={{
            shrink: true,
            style: { color: colors.gray[100], fontSize: "18.5px", fontFamily:"Figtree",  },
          }}
          sx={{
            "& .MuiInputBase-input": {
              color: colors.gray[100],
              fontSize: "17px",fontFamily:"Figtree", 
            },
            "& .MuiOutlinedInput-root fieldset": {
              borderColor: colors.primary[200],
              fontSize: "17px",fontFamily:"Figtree", 
            },
          }}
        />

        {/* Password Field with Toggle Visibility */}
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"} // Toggle between "text" and "password" types
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="dense"
          InputLabelProps={{
            shrink: true,
            style: { color: colors.gray[100], fontSize: "18px",fontFamily:"Figtree",  },
          }}
          sx={{
            "& .MuiInputBase-input": {
              color: colors.gray[100],
              fontSize: "17px",fontFamily:"Figtree", 
            },
            "& .MuiOutlinedInput-root fieldset": {
              borderColor: colors.primary[200],
              fontSize: "17px",fontFamily:"Figtree", 
            },
          }}
          InputProps={{
            // Eye toggle button for password visibility
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  edge="end"
                  sx={{ color: colors.gray[100] }}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Signup Button */}
        <Button
          type="submit"
          variant="contained"
          sx={{
            width: "100%",
            marginTop: "20px",
            backgroundColor: "#009999",
            padding: "15px",
            fontSize: "18px",
            fontFamily:"Figtree", 
            "&:hover": {
              backgroundColor: "#006666",
              color: "whitesmoke",
            },
          }}
        >
          Sign Up
        </Button>

        {/* Have an Account? Login Link */}
        <p style={{ color: colors.gray[100], marginTop: "10px",fontFamily:"Figtree",  }}>
          Have an Account? <Link to="/login" style={{ color: colors.primary[200],fontFamily:"Figtree",  }}>Login</Link>
        </p>
      </Box>
    </Box>
  );
};

export default Signup;
