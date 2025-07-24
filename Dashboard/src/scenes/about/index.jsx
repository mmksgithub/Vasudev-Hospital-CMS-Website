import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, TextField, useTheme } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { tokens } from "../../theme"; // Adjust the import based on your project structure
import { Header } from "../../components"; // Ensure you import your Header component
import config from "../../../env";

const AboutUsForm = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [formData, setFormData] = useState({
    header: "",
    description: "",
    vision: "",
    mission: "",
    image: "",
  });
  const [imagePreview, setImagePreview] = useState("");

  // Fetch About Us data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${config.PROJECT_URL}/api/about-us`);
        setFormData(response.data);
        setImagePreview(`${config.PROJECT_URL}/uploads/${response.data.image}`); // Load image preview from the server
      } catch (error) {
        toast.error("Error fetching About Us data");
      }
    };
    fetchData();
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file)); // Preview the image
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("header", formData.header);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("vision", formData.vision);
    formDataToSend.append("mission", formData.mission);

    if (formData.image instanceof File) {
      formDataToSend.append("image", formData.image); // Append the image file
    }
    try {
      const response = await axios.put(
        `${config.PROJECT_URL}/api/about-us`,
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // Update the form state with the new data
      setFormData(response.data);
      setImagePreview(`${config.PROJECT_URL}/uploads/${response.data.image}`); // Show new image preview
      toast.success("About Us Section Updated!");
      
    } catch (error) {
      toast.error("Error updating About Us");
    }
  };

  return (
    <Box m="20px">
      {/* Added Header component for title and subtitle */}
      <Header title="About Us Section" subtitle="Update" />

      <ToastContainer position="top-center" />
      <Box
        component="form"
        onSubmit={handleSubmit}
        mt="40px"
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
          fontFamily:"Figtree",

        }}
      >
        <TextField
          label="About Us Header"
          name="header"
          value={formData.header}
          onChange={handleChange}
          fullWidth
          margin="dense"
          InputLabelProps={{
            shrink: true,
            style: { color: colors.gray[100], fontSize: "17px",                          fontFamily:"Figtree",
            },
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
          label="About Us Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          multiline
          fullWidth
          margin="dense"
          InputLabelProps={{
            shrink: true,
            style: { color: colors.gray[100], fontSize: "17px",                          fontFamily:"Figtree",
            },
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
          label="Our Vision"
          name="vision"
          value={formData.vision}
          onChange={handleChange}
          multiline
          rows={4}
          fullWidth
          margin="dense"
          InputLabelProps={{
            shrink: true,
            style: { color: colors.gray[100], fontSize: "17px",                          fontFamily:"Figtree",
            },
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
          label="Our Mission"
          name="mission"
          value={formData.mission}
          onChange={handleChange}
          multiline
          rows={4}
          fullWidth
          margin="dense"
          InputLabelProps={{
            shrink: true,
            style: { color: colors.gray[100], fontSize: "17px" ,                          fontFamily:"Figtree",
            },
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

        {imagePreview && (
          <img
            src={imagePreview}
            alt="About Us"
            style={{ width: "300px", height: "auto", borderRadius: "6px",                          fontFamily:"Figtree",
            }}
          />
        )}

        <Button
          variant="contained"
          component="label"
          sx={{
            backgroundColor: "#c0c0c0",
            color: "#606060",

            width: "300px", // Smaller button
            marginTop: "0px",
            padding: "0px 0px",
            fontSize: "18px",
            fontFamily:"Figtree",

            "&:hover": {
              backgroundColor: "#e0e0e0",
              color: "#006666",
            }, // Space between image and button
          }}
        >
          Update Image
          <input
            type="file"
            hidden
           
            onChange={handleImageChange}
          />
        </Button>

        <Button
          type="submit"
          variant="contained"
          sx={{
            marginTop: "20px",
            backgroundColor: "#006666",
            padding: "15px 20px",
            fontSize: "18px",
                          fontFamily:"Figtree",

            "&:hover": {
              backgroundColor: "#004444",
              color: "whitesmoke",
            },
          }}
        >
          Update About Us
        </Button>
      </Box>
    </Box>
  );
};

export default AboutUsForm;
