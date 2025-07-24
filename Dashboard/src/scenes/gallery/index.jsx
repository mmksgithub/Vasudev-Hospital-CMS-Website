import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { tokens } from '../../theme';

import {  useTheme } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import { Header } from "../../components";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import config from "../../../env";


const ViewPhotos = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editPhoto, setEditPhoto] = useState(null);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [updatedPhotoFile, setUpdatedPhotoFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState(""); // State to hold the selected file name
  const [openDelete, setOpenDelete] = useState(false); // State for delete confirmation
  const [photoToDelete, setPhotoToDelete] = useState(null); // State to hold the photo to be deleted

  // Fetch photos from the backend
  const fetchPhotos = async () => {
    try {
      const response = await axios.get(`${config.PROJECT_URL}/api/photos`);
      setPhotos(response.data);
    } catch (error) {
      setError("Could not fetch photos");
    } finally {
      setLoading(false);
    }
  };

  // Handle opening the delete confirmation dialog
  const handleOpenDelete = (photo) => {
    setPhotoToDelete(photo);
    setOpenDelete(true);
  };

  // Handle close of delete confirmation dialog
  const handleCloseDelete = () => {
    setOpenDelete(false);
    setPhotoToDelete(null);
  };

  // Handle deleting a photo
  const handleDeletePhoto = async () => {
    try {
      await axios.delete(
        `${config.PROJECT_URL}/api/photos/${photoToDelete._id}`
      );
      setPhotos(photos.filter((photo) => photo._id !== photoToDelete._id));
      toast.success("Photo removed Successfully!");
    } catch (error) {
      toast.error("Failed to remove photo.");
    } finally {
      handleCloseDelete(); // Close delete dialog after the action is done
    }
  };

  // Open update dialog
  const handleOpenUpdate = (photo) => {
    setEditPhoto(photo);
    setOpenUpdate(true);
  };

  // Handle closing update dialog
  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    setEditPhoto(null);
    setUpdatedPhotoFile(null);
    setSelectedFileName(""); // Reset selected file name on close
  };

  // Handle file change for updating photo
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setUpdatedPhotoFile(file);
    setSelectedFileName(file ? file.name : ""); // Update file name or reset
  };

  // Handle updating photo
  const handleUpdatePhoto = async () => {
    if (!updatedPhotoFile) {
      toast.error("Please select a photo to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("photo", updatedPhotoFile);

    try {
      await axios.put(
        `${config.PROJECT_URL}/api/photos/${editPhoto._id}`,
        formData
      );
      toast.success("Photo Updated Successfully!");
      fetchPhotos(); // Refresh the photos list after update
      handleCloseUpdate();
    } catch (error) {
      toast.error("Failed to update photo.");
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const columns = [
    {
      field: "filePath", // Adjust this field name based on your backend
      headerName: "Photo",
      flex: 1,
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <img
            src={`${config.PROJECT_URL}/${params.row.filePath}`} // Adjust the path if necessary
            alt="Gallery Photo"
            style={{
              width: "200px", // Adjust this width if needed
              height: "140px", // Adjust this height if needed
              borderRadius: "5px",
              objectFit: "cover",
            }}
          />
        </div>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <>
        
          <Button
            variant="contained"
            color="secondary"
            startIcon={<EditIcon />}
            onClick={() => handleOpenUpdate(params.row)}
            sx={{
              marginRight: "10px",
              padding: "10px 60px 10px 60px",
              fontSize: "15px",
              fontFamily: "Figtree", 
            }}
          >
            Update
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => handleOpenDelete(params.row)} // Open delete confirmation dialog
            sx={{
              marginLeft: "10px",
              padding: "10px 60px 10px 60px",
              fontSize: "15px",
              fontFamily: "Figtree", 
            }}
          >
            Remove
          </Button>
        </>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="Gallery Section" subtitle="View / Update / Remove Photos"   />
      <Box
       sx={{ mb: 3, borderRadius: "8px", backgroundColor: colors.primary[400], marginTop: "20px",
        
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#047EA4",
            borderBottom: "none",
            fontSize: "19px",
            fontWeight: "bold",
            color: "White",
            fontFamily: "Figtree", 

            
          },

          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: "#047EA4",
            fontSize: "0px",
            fontFamily: "Figtree", 

          },
        }}
      >
        <DataGrid
          rows={photos}
          columns={columns}
          getRowId={(row) => row._id}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[5, 10, 20]}
          pagination
          rowHeight={150} // Increase the row height here
        />
      </Box>

      {/* Update Photo Dialog */}
      <Dialog open={openUpdate} onClose={handleCloseUpdate}>
        <DialogTitle>
          <h2>Update Photo</h2>
        </DialogTitle>
        <DialogContent>
          {/* Container to hold button and message in a row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "20px",
                fontFamily: "Figtree", 
            }}
          >
            <Button
              variant="contained"
              component="label"
              sx={{
                backgroundColor: "#595C62",
                color: "whitesmoke",
                padding: "6px 20px",
                textTransform: "none",
                fontFamily: "Figtree", 
                fontSize:"13px",

                "&:hover": { backgroundColor: "#333a46" },
              }}
            >
              Upload Image
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                hidden // This hides the default file input
              />
            </Button>

            {/* Display selected file name or 'wwsfile uploaded' to the right of the button */}
            <div
              style={{
                marginLeft: "20px",
                color: selectedFileName ? "black" : "",
                fontFamily: "Figtree", 

              }}
            >
              {selectedFileName
                ? `Selected file: ${selectedFileName}`
                : "No file uploaded"}
            </div>
          </div>
          <br></br>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseUpdate}
            sx={{
              backgroundColor: "#103850",
              color: "whitesmoke",
              padding: "6px 20px",
              textTransform: "none",
              marginRight: "35px",
              fontFamily: "Figtree", 
              fontSize:"13px",


              "&:hover": { backgroundColor: "#2B678A" },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpdatePhoto}
            sx={{
              backgroundColor: "#1DBC72", // Darker blue for hover
              color: "white",
              fontFamily: "Figtree", 
              fontSize:"13px",
              "&:hover": {
                backgroundColor: "#01956E", // Darker green for hover
              },
            }}
          >
            Update Photo
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle>
          <h3>Confirm Remove</h3>
        </DialogTitle>
        <DialogContent>
          Are you sure you want to remove this photo?
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDelete}
            sx={{
              backgroundColor: "#333a46",
              color: "whitesmoke",
              padding: "6px 20px",
              textTransform: "none",
              "&:hover": { backgroundColor: "#595C62" },
            }}
          >
            No
          </Button>
          <Button
            onClick={handleDeletePhoto}
            color="error"
            sx={{
              backgroundColor: "#d9534f",
              color: "whitesmoke",
              padding: "6px 20px",
              textTransform: "none",
              "&:hover": { backgroundColor: "#c9302c" },
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer position="top-center" />
    </Box>
  );
};

export default ViewPhotos;
