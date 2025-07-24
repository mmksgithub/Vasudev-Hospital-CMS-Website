import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, useTheme,Typography } from "@mui/material";
import axios from 'axios';
import { Header } from '../../components';
import { tokens } from "../../theme"; // Adjust the import based on your project structure
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from "../../../env";


const Links = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [socialLinks, setSocialLinks] = useState({
    twitter: '',
    facebook: '',
    instagram: '',
    linkedin: ''
  });

  // Fetch existing links on component mount
  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await axios.get(`${config.PROJECT_URL}/api/links`); // API to fetch existing links
        setSocialLinks(response.data);
      } catch (error) {
        toast.error('Error fetching social links.');
        console.error('Error fetching social links:', error);
      }
    };

    fetchLinks();
  }, []);

  // Handle form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSocialLinks((prevLinks) => ({
      ...prevLinks,
      [name]: value
    }));
  };

  // Submit updated links
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${config.PROJECT_URL}/api/links`, socialLinks); // API to update links
      toast.success('Links updated successfully!');
    } catch (error) {
      toast.error('Error updating links.');
      console.error('Error updating links:', error);
    }
  };

  return (
    <Box m="20px">
      <Header title="Social Links" subtitle="Update links" />
      
      <Box component="form" onSubmit={handleSubmit} mt="40px"
        display="flex"
        flexDirection="column"
        gap="27px"
        sx={{
          backgroundColor: colors.primary[400],
          padding: "40px",
          borderRadius: "8px",
          maxWidth: "2000px", // Adjusted for a reasonable width
          margin: "auto",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
        >
        <Typography variant="h4" mb={2}><b>Update Social Media Links</b></Typography>

        <TextField
          fullWidth
          label="Twitter Link"
          name="twitter"
          value={socialLinks.twitter}
          onChange={handleInputChange}
          margin="dense"
            InputLabelProps={{
              shrink: true,
              style: { color: colors.gray[100], fontSize: "18px",fontFamily:"Figtree",  },
            }}
            sx={{
              "& .MuiInputBase-input": {
                color: colors.gray[100],
                fontSize: "17.4px",
                fontFamily:"Figtree", 
              },
              "& .MuiOutlinedInput-root fieldset": {
                borderColor: colors.primary[200],
                fontSize: "17px",
                fontFamily:"Figtree", 
              },
            }}
          />
       

        <TextField
          fullWidth
          label="Facebook Link"
          name="facebook"
          value={socialLinks.facebook}
          onChange={handleInputChange}
          margin="dense"
          InputLabelProps={{
            shrink: true,
            style: { color: colors.gray[100], fontSize: "18px",fontFamily:"Figtree",  },
          }}
          sx={{
            "& .MuiInputBase-input": {
              color: colors.gray[100],
              fontSize: "17.4px",
              fontFamily:"Figtree", 
            },
            "& .MuiOutlinedInput-root fieldset": {
              borderColor: colors.primary[200],
              fontSize: "17px",
              fontFamily:"Figtree", 
            },
          }}
        />
      

        <TextField
          fullWidth
          label="Instagram Link"
          name="instagram"
          value={socialLinks.instagram}
          onChange={handleInputChange}
          margin="dense"
            InputLabelProps={{
              shrink: true,
              style: { color: colors.gray[100], fontSize: "18px",fontFamily:"Figtree",  },
            }}
            sx={{
              "& .MuiInputBase-input": {
                color: colors.gray[100],
                fontSize: "17.4px",
                fontFamily:"Figtree", 
              },
              "& .MuiOutlinedInput-root fieldset": {
                borderColor: colors.primary[200],
                fontSize: "17px",
                fontFamily:"Figtree", 
              },
            }}
          />
        

        <TextField
          fullWidth
          label="LinkedIn Link"
          name="linkedin"
          value={socialLinks.linkedin}
          onChange={handleInputChange}
          margin="dense"
            InputLabelProps={{
              shrink: true,
              style: { color: colors.gray[100], fontSize: "18px",fontFamily:"Figtree",  },
            }}
            sx={{
              "& .MuiInputBase-input": {
                color: colors.gray[100],
                fontSize: "17.4px",
                fontFamily:"Figtree", 
              },
              "& .MuiOutlinedInput-root fieldset": {
                borderColor: colors.primary[200],
                fontSize: "17px",
                fontFamily:"Figtree", 
              },
            }}
          />
  


        <Button type="submit" variant="contained" color="primary" sx={{
            marginTop: "20px",
            backgroundColor: "#004c99",
            padding: "15px 20px",
            fontSize: "18px",
            fontFamily:"Figtree", 
            "&:hover": {
              backgroundColor: "#003366",
              color: "whitesmoke",
            },
          }}>
          Update Links
        </Button>
      </Box>

      <ToastContainer position="top-center" />
    </Box>
  );
};

export default Links;
