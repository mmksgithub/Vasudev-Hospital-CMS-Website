// Login.jsx
import React, { useState, useContext } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Box, Button, TextField, IconButton, InputAdornment, useTheme } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { tokens } from "./theme";
import logo from "./assets/images/vasudev-logo-rb.png";
import config from "../env";
import { AuthContext } from "./context/AuthContext";  // Import AuthContext for login status

const Login = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { login } = useContext(AuthContext);  // Access login function from AuthContext

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;

  const handleClickShowPassword = () => setShowPassword(!showPassword);

const handleSubmit = (e) => {
  e.preventDefault();
  Axios.post(`${config.PROJECT_URL}/api/users/login`, {
    username,
    password,
  })
    .then((response) => {
      if (response.data.status) {
        toast.success("Login successful!", {
          position: "top-center",
          autoClose: 2000,
          style: { backgroundColor: '#000000', color: 'white' },
        });

        // Delay the navigation to allow the toast to show
        setTimeout(() => {
          login(response.data.token);  // Save token to context
          navigate("/dashboard");      // Navigate to dashboard
        }, 1000);  // 2-second delay
      } else {
        toast.error("Invalid username or password.", { autoClose: 2000 });
      }
    })
    .catch((err) => {
      toast.error("Invalid username or password. Please try again.", { autoClose: 2000 });
    });
};

  return (
    <Box sx={{ width: '100%', height: '100vh', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <ToastContainer position="top-center" />
      <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" alignItems="center" gap="20px" 
           sx={{ backgroundColor: "#E9FFFD", padding: "40px", borderRadius: "8px", maxWidth: "600px", width: '100%', margin: "auto",marginTop: "0",
           boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", position: "relative" }}>
        <Link to="https://vasudevhealthcare.com" style={{ position: "absolute", top: "10px", right: "10px", color: colors.primary[200], 
              textDecoration: "none", fontSize: "14px", fontFamily:"Figtree" }}>
          Back To Website
        </Link>
        <img style={{ width: "100%", maxWidth: "500px", height: "130px", borderRadius: "5px" }} src={logo} alt="Logo" />
        <h2 style={{ color: colors.gray[100], fontSize: "30px", margin: 0, fontFamily:"Figtree" }}>Admin Login</h2>

        <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} fullWidth margin="dense"
          InputLabelProps={{ shrink: true, style: { color: colors.gray[100], fontSize: "18px", fontFamily:"Figtree" }}}
          sx={{ "& .MuiInputBase-input": { color: colors.gray[100], fontSize: "17px", fontFamily:"Figtree" },
                "& .MuiOutlinedInput-root fieldset": { borderColor: colors.primary[200], fontSize: "17px", fontFamily:"Figtree" }}} />
        <TextField label="Password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} fullWidth
          margin="dense" InputLabelProps={{ shrink: true, style: { color: colors.gray[100], fontSize: "18px", fontFamily:"Figtree" }}}
          sx={{ "& .MuiInputBase-input": { color: colors.gray[100], fontSize: "17px", fontFamily:"Figtree" },
                "& .MuiOutlinedInput-root fieldset": { borderColor: colors.primary[200], fontSize: "17px", fontFamily:"Figtree" }}}
          InputProps={{ endAdornment: (<InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword} edge="end" sx={{ color: colors.gray[100] }}>
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>), }} />
        <Button type="submit" variant="contained" sx={{ width: "100%", marginTop: "20px", backgroundColor: "#009999", padding: "15px", 
              fontSize: "18px", fontFamily:"Figtree", "&:hover": { backgroundColor: "#006666", color: "whitesmoke" }}}>
          Login
        </Button>
        <Link to="/forgotPassword" style={{ color: colors.gray[100], marginTop: "10px", fontFamily:"Figtree" }}>Forgot Password?</Link>
        <p style={{ color: colors.gray[100], marginTop: "10px", fontFamily:"Figtree" }}>Don't Have Account?{" "}
          <Link to="/signup" style={{ color: colors.primary[200], fontFamily:"Figtree" }}>Sign Up</Link></p>
      </Box>
    </Box>
  );
};

export default Login;

