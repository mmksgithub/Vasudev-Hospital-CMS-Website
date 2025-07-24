// Dashboard.jsx
import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from "../../../src/assets/images/vasudev-logo-keb.png";
import { tokens } from "../../theme";
import { Box, Typography, useTheme } from "@mui/material";
import config from "../../../env";
import { AuthContext } from "../../context/AuthContext";  // Import AuthContext

const Dashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { isAuthenticated } = useContext(AuthContext);  // Access isAuthenticated from AuthContext
  axios.defaults.withCredentials = true;

  useEffect(() => {
    if (!isAuthenticated) {
      axios.get(`${config.PROJECT_URL}/api/users/verify`)
        .then(res => {
          if (!res.data.status) {
            navigate('/login');
          }
        })
        .catch(() => {
          navigate('/login');
        });
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center" sx={{ padding: { xs: "20px", md: "40px" } }}>
        <img style={{ maxWidth: "90%", height: "auto", borderRadius: "5px", marginTop: "0px", backgroundColor: colors.primary[995] }} 
             src={logo} alt="Logo" />
      </Box>
      <Typography variant="h1" sx={{ fontSize: { xs: "30px", md: "50px" }, textAlign: "center", marginTop: "-10px", 
            marginBottom: { xs: "10px", md: "30px" }, color: colors.gray[100], fontFamily: "Figtree" }}>
        Welcome to Administrator dashboard!
      </Typography>
    </>
  );
};

export default Dashboard;

