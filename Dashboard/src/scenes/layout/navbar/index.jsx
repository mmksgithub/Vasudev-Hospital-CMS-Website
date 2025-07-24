import {
  Box,
  IconButton,
  useTheme,
} from "@mui/material";
import { tokens, ColorModeContext } from "../../../theme";
import { useContext } from "react";
import {
  DarkModeOutlined,
  LightModeOutlined,
  NotificationsOutlined,
  PersonOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import axios from "axios"; // Import axios to handle the logout request
import React, { useState,useEffect } from "react";
import config from "../../../../env";




const Navbar = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;


  // Logout handler
  const logoutHandler = async () => {
    axios.get(`${config.PROJECT_URL}/api/users/logout`)
    .then(res => {
      if(res.data.status) {
        navigate('/login')
      }
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      backgroundColor={colors.primary[990]}
      boxShadow="0px 5px 5px rgba(0, 0, 0, 0.1)" 
      p={2}
      width="100%"
    >
      <Box sx={{ overflow: 'hidden', textOverflow: 'ellipsis', fontSize: "30px", whiteSpace: 'nowrap' ,        fontFamily: "Figtree",
}}>
        <p style={{ margin: 0, color:"" }}>Welcome to Administrator Dashboard</p>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <LightModeOutlined />
          ) : (
            <DarkModeOutlined />
          )}
        </IconButton>
       

        {/* Logout button */}
        <IconButton onClick={logoutHandler}>
          <PersonOutlined />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Navbar;
