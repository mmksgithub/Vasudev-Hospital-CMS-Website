import { Box, Button, useMediaQuery } from "@mui/material";
import { Header } from "../../components";
import { Formik } from "formik";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify"; 
import 'react-toastify/dist/ReactToastify.css'; 
import axios from 'axios'; 
import { useState } from "react";
import config from "../../../env";


// Form validation schema
const checkoutSchema = yup.object().shape({
  photo: yup.mixed().required("Photo is required"), // Only photo is required
});

const PhotoForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [photos, setPhotos] = useState([]); // State to store photos

  const handleFormSubmit = async (values, actions) => {
    const formData = new FormData();
    formData.append('photo', values.photo);

    try {
      const response = await axios.post(`${config.PROJECT_URL}/api/photos`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200 || response.status === 201) {
        setPhotos((prev) => [...prev, response.data]);
        toast.success("Photo added Successfully!");
        actions.resetForm();
      } else {
        throw new Error('Unexpected response');
      }
    } catch (error) {
      console.error("Error adding the photo:", error);
      toast.error("Error adding the photo. Please try again.");
    }
  };

  return (
    <Box m="20px">
      <Header title=" Gallery Section" subtitle="Add Photos" />

      <ToastContainer position="top-center" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={{ photo: null }}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          setFieldValue,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
  <Box
    display="grid"
    gap="30px"
    gridTemplateColumns="repeat(1, minmax(0, 1fr))"
    sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4",fontFamily: "Figtree",  } }}
  >
    {/* Image Label */}
    <Box>
      <label style={{ fontSize: "20px", marginBottom: "10px",fontFamily: "Figtree",  }}>Image</label>
    </Box>

    {/* File Upload - Side by Side Button and Message */}
    <Box display="flex" alignItems="center"> {/* Flex layout for button and message */}
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="photo-upload"
        type="file"
        onChange={(event) => {
          setFieldValue("photo", event.currentTarget.files[0]);
        }}
      />

      <label htmlFor="photo-upload">
        <Button
          variant="contained"
          component="span"
          sx={{
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
          Upload Photo
        </Button>
      </label>

      {/* File name or no file uploaded message */}
      <span style={{ marginLeft: '15px', fontSize: '14px' }}> {/* Adjusted margin for space */}
        {values.photo ? `${values.photo.name} is uploaded` : 'No file uploaded'}
      </span>
    </Box>

    {/* Error Handling */}
    {touched.photo && errors.photo && <div style={{ color: "red" }}>{errors.photo}</div>}
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
                  backgroundColor: '#047eaa',
                  color: 'white',
                  fontFamily: "Figtree", 
                  '&:hover': {
                    backgroundColor: '#075C7A',
                  },
                  borderRadius: '2px',
                  boxShadow: '0px 6px 6px rgba(0, 0, 0, 0.3)',
                }}
              >
                Add Photo
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default PhotoForm;
