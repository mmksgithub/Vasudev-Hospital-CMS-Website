import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"; // Optional: for showing messages
import "react-toastify/dist/ReactToastify.css"; // Import toastify styles
import { Box, Button, TextField, useTheme } from "@mui/material"; // Import MUI components
import { tokens } from "./theme"; // Import tokens for theme-based styling
import logo from "./assets/images/vasudev-logo-rb.png";
import config from "../env";

const ForgotPassword = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode); // Access theme colors

  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post(`${config.PROJECT_URL}/api/users/forgot-password`,
   {
      email,
    })
      .then((response) => {
        if (response.data.status) {
          // Show success toast message
          toast.success("Check your email for the reset password link!", {
            position: "top-center",
            autoClose: 4000,
            style: { backgroundColor: "black", color: "white" }, // Custom style for the toast
          });

          // Delay navigation to /login to allow toast to show
          setTimeout(() => {
            navigate("/login");
          }, 4000); // 4 seconds delay before redirect
        } else {
          // Show error toast message
          toast.error("Failed to send reset link. Please try again.", {
            position: "top-center",
            autoClose: 2000,
            style: { backgroundColor: "#080808", color: "white" }, // Custom style for the error toast
          });
        }
      })
      .catch((err) => {
        console.log(err);
        // Show error toast if request fails
        toast.error("Please check your email is correct.", {
          position: "top-center",
          autoClose: 3000,
          style: { backgroundColor: "#000000", color: "white" }, // Custom style for the error toast
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
          fontFamily: "Figtree",
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
          }}
        >
          Forgot Password
        </h2>

        {/* Email Input Field */}
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="dense"
          InputLabelProps={{
            shrink: true,
            style: {
              color: colors.gray[100],
              fontSize: "18.5px",
              fontFamily: "Figtree",
            },
          }}
          sx={{
            "& .MuiInputBase-input": {
              color: colors.gray[100],
              fontSize: "17px",
              fontFamily: "Figtree",
            },
            "& .MuiOutlinedInput-root fieldset": {
              borderColor: colors.primary[200],
              fontSize: "17px",
              fontFamily: "Figtree",
            },
          }}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          sx={{
            width: "100%",
            marginTop: "20px",
            backgroundColor: "#009999",
            padding: "15px",
            fontSize: "18px",
            fontFamily: "Figtree",
            "&:hover": {
              backgroundColor: "#006666",
              color: "whitesmoke",
            },
          }}
        >
          Send Reset Link
        </Button>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
