import { Box, Button, TextField, useMediaQuery } from "@mui/material";
import { Header } from "../../components";
import { Formik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import axios from 'axios'; // Import axios
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import config from "../../../env";


const initialValues = {
  id: "",
  name: "",
  qualification: "",
  photo: null, // To hold the uploaded file
};

const checkoutSchema = yup.object().shape({
  name: yup.string().required("Doctor's name is required"),
  qualification: yup.string().required("Qualification is required"),
  photo: yup.mixed().required("Photo is required"),
});

const DoctorForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [doctors, setDoctors] = useState([]);

  const handleFormSubmit = async (values, actions) => {
    const formData = new FormData(); // Create a new FormData object
    formData.append('name', values.name);
    formData.append('qualification', values.qualification);
    formData.append('photo', values.photo); // Append the photo

    try {
      // Send POST request to your backend API
      const response = await axios.post(`${config.PROJECT_URL}/api/doctors`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set content type for form data
        },
      });

      // Check if the response was successful
      if (response.status === 200 || response.status === 201) {
        // If the request is successful, add the new doctor to the state
        setDoctors((prev) => [...prev, response.data]);
        
        // Show success toast notification
        toast.success(`Doctor ${response.data.name} added successfully!`);
        
        actions.resetForm({ values: initialValues }); // Reset the form after submission
      } else {
        // Handle unexpected response
        throw new Error('Unexpected response');
      }
    } catch (error) {
      console.error("There was an error adding the doctor:", error);
      // Show error toast notification
      toast.error(error.response?.data?.message || "Error adding the doctor. Please try again.");
    }
  };

  return (
    <Box m="20px" fontFamily="Figtree">
      <Header title="Doctors Section" subtitle="Add Doctor's"/>
      
      {/* Toast Container */}
      <ToastContainer position="top-center" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue, // This will be used for file uploads
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(1, minmax(0, 1fr))"
              sx={{
                "& > div": {
                  gridColumn: isNonMobile ? undefined : "span 4",
                              fontFamily: "Figtree",

                },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Doctor's Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}

              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Qualification"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.qualification}
                name="qualification"
                error={touched.qualification && Boolean(errors.qualification)}
                helperText={touched.qualification && errors.qualification}
              />
              
              <Box display="flex" flexDirection="column" mt="-10px">
                <label>
                  <p style={{ fontSize: "16px", marginBottom: "20px" }}>Image</p>
                </label>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="photo-upload"
                  type="file"
                  onChange={(event) => {
                    setFieldValue("photo", event.currentTarget.files[0]);
                  }}
                />

                <Box display="flex" alignItems="center">
                  <label htmlFor="photo-upload">
                    <Button 
                      variant="contained" 
                      component="span" 
                      sx={{ 
                        marginTop: '-15px',    
                        backgroundColor: '#e0e0e0', 
                        color: "Black", 
                        fontSize: "14px",
                        textTransform: 'none',
                        fontFamily: "Figtree",

                        '&:hover': {
                          backgroundColor: '#606060',
                          color: "whitesmoke",
                                                      

                        },
                      }}
                    >
                      Upload Image
                    </Button>
                  </label>
                  <span style={{ marginLeft: '13px', marginTop: '-20px' }}>
                    <p>
                      {values.photo ? `${values.photo.name} is uploaded` : 'No file uploaded'}
                    </p>
                  </span>
                </Box>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="start" mt="20px">
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                sx={{
                  padding: '12px 80px',
                  fontSize: '17px',
                  marginTop: "30px",
                  backgroundColor: '#1e7c74',
                  color: 'white',
                  fontFamily: "Figtree",

                  '&:hover': {
                    backgroundColor: '#1B625D',
                  },
                  borderRadius: '2px',
                  boxShadow: '0px 6px 6px rgba(0, 0, 0, 0.3)',
                }}
              >
                Add Doctor
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default DoctorForm;
