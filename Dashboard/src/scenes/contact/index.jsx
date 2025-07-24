import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, TextField, useTheme } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { tokens } from "../../theme"; // Adjust the import based on your project structure
import { Header } from "../../components"; // Ensure you import your Header component
import config from "../../../env";


const Contact = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Define the initial state for the form data
  const [formData, setFormData] = useState({
    city: "",
    state: "",
    pincode: "",
    primaryEmail: "",
    secondaryEmail: "",
    primaryContact: "",
    secondaryContact: "",
    address: "",
  });

  // Fetch Contact Us data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${config.PROJECT_URL}/api/contact-us`);
        setFormData(response.data);
      } catch (error) {
        toast.error("Error fetching Contact Us data");
      }
    };
    fetchData();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData); // Log the data being sent
    try {
      const response = await axios.put(`${config.PROJECT_URL}/api/contact-us`, formData);
      setFormData(response.data); // Update formData with the new response
      toast.success("Contact Us updated Successfully!");
    } catch (error) {
      toast.error("Error updating Contact Us: " + error.response?.data?.message || "Unknown error");
    }
  };

  return (
    <Box m="20px">
      {/* Added Header component for title and subtitle */}
      <Header title="Contact Us Section" subtitle="Update" />

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
        {/* Form Fields */}
        {["city", "state", "pincode", "primaryEmail", "secondaryEmail", "primaryContact", "secondaryContact"].map((field, index) => (
          <TextField
            key={index}
            label={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')} // Format the label
            name={field}
            value={formData[field]}
            onChange={handleChange}
            fullWidth
            margin="dense"
            InputLabelProps={{
              shrink: true,
              style: { color: colors.gray[100], fontSize: "17.7px",                           fontFamily:"Figtree",
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
        ))}

        <TextField
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          multiline
          rows={3}
          fullWidth
          margin="dense"
          InputLabelProps={{
            shrink: true,
            style: { color: colors.gray[100], fontSize: "17px" },
          }}
          sx={{
            "& .MuiInputBase-input": {
              color: colors.gray[100],
              fontSize: "17.4px",
            },
            "& .MuiOutlinedInput-root fieldset": {
              borderColor: colors.primary[200],
              fontSize: "17px",
            },
          }}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{
            marginTop: "20px",
            backgroundColor: "#003366",
            padding: "15px 20px",
            fontSize: "17px",
            fontFamily:"Figtree",

            "&:hover": {
              backgroundColor: "#012043",
              color: "whitesmoke",
            },
          }}
        >
          Update Contact Us
        </Button>
      </Box>
    </Box>
  );
};

export default Contact;
