import React, { useState } from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"; // Optional: for showing messages
import "react-toastify/dist/ReactToastify.css"; // Import toastify styles
import {
  Box,
  Button,
  TextField,
  IconButton,
  InputAdornment,
  useTheme,
} from "@mui/material"; // Import MUI components
import { tokens } from "./theme"; // Import tokens for theme-based styling
import { Visibility, VisibilityOff } from "@mui/icons-material"; // Icons for eye toggle
import logo from "./assets/images/vasudev-logo-rb.png";
import config from "../env";

const ResetPassword = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode); // Access theme colors

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const { token } = useParams();
  const navigate = useNavigate();

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Axios.post(`${config.PROJECT_URL}/api/users/reset-password/` + token, {
      password,
    })
      .then((response) => {
        if (response.data.status) {
          toast.success("Password reset successful!", {
            autoClose: 8000,
          });
          navigate("/login");
        } else {
          toast.error("Failed to reset password. Please try again.", {
            position: "top-center",
            autoClose: 3000,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Please Enter New Password!", {
          position: "top-center",
          autoClose: 3000,
        });
      });
  };

  return (
    <Box m="20px">
      <ToastContainer position="top-center" />{" "}
      {/* Optional: For message notifications */}
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
          maxWidth: "600px",
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
        <h2
          style={{
            color: colors.gray[100],
            fontSize: "24px",
            fontWeight: "bold",
            fontFamily:"Figtree", 
          }}
        >
          Reset Password
        </h2>

        {/* Password Input Field with Toggle */}
        <TextField
          label="New Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="dense"
          InputLabelProps={{
            shrink: true,
            style: { color: colors.gray[100], fontSize: "17.8px",fontFamily:"Figtree",  },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleTogglePasswordVisibility}
                  edge="end"
                  style={{ color: colors.gray[100] }}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiInputBase-input": {
              color: colors.gray[100],
              fontSize: "17px",
              fontFamily:"Figtree", 
            },
            "& .MuiOutlinedInput-root fieldset": {
              borderColor: colors.primary[200],
              fontSize: "17px",fontFamily:"Figtree", 
            },
          }}
        />

        {/* Reset Button */}
        <Button
          type="submit"
          variant="contained"
          sx={{
            width: "100%",
            marginTop: "20px",
            backgroundColor: "#009999",
            padding: "15px",
            fontSize: "18px",fontFamily:"Figtree", 
            "&:hover": {
              backgroundColor: "#006666",
              color: "whitesmoke",
            },
          }}
        >
          Reset Password
        </Button>
      </Box>
    </Box>
  );
};

export default ResetPassword;
