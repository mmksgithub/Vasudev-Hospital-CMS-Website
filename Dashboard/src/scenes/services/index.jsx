import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, TextField, Button, Typography, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { tokens } from '../../theme';
import { Header } from '../../components';
import config from "../../../env";


const ViewServices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [servicesData, setServicesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [currentService, setCurrentService] = useState({
    id: '',
    header: '',
    description: '',
    image: null,
    imageUrl: '',
  });
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    const fetchServicesData = async () => {
      try {
        const response = await axios.get(`${config.PROJECT_URL}/api/services`);
        setServicesData(response.data);
      } catch (error) {
        setError('Error fetching services data.');
      } finally {
        setLoading(false);
      }
    };

    fetchServicesData();
  }, []);

  const handleEdit = (id) => {
    const selectedService = servicesData.find((service) => service._id === id);
    setCurrentService({
      id: selectedService._id,
      header: selectedService.header,
      description: selectedService.description,
      image: null, // Initially set to null
      imageUrl: `${config.PROJECT_URL}/uploads/${selectedService.image}`,
    });
    setImagePreview(`${config.PROJECT_URL}/uploads/${selectedService.image}`);
    setIsUpdateMode(true);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('header', currentService.header);
    formData.append('description', currentService.description);

    // Only append the image if a new one is selected
    if (currentService.image) {
      formData.append('image', currentService.image); 
    }

    try {
      await axios.put(`${config.PROJECT_URL}/api/services/${currentService.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }, // Ensure correct header
      });
      toast.success('Service updated Successfully!');
      
      // Reload the updated data
      const response = await axios.get(`${config.PROJECT_URL}/api/services`);
      setServicesData(response.data);
      setCurrentService({ id: '', header: '', description: '', image: null, imageUrl: '' });
      setImagePreview('');
    } catch (error) {
      toast.error('Error updating service.');
    } finally {
      setIsUpdateMode(false);
    }
  };

  const handleInputChange = (e) => {
    setCurrentService({ ...currentService, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCurrentService((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file)); // Preview the selected image
    }
  };

  const columns = [
    { field: 'header', headerName: 'Header', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 2 },
    {
      field: 'image',
      headerName: 'Image',
      flex: 1,
      renderCell: (params) => (
        <img
          src={`${config.PROJECT_URL}/uploads/${params.row.image}`}
          alt={params.row.header}
          style={{ width: '200px', height: '120px', borderRadius: '6px' }}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="secondary"
          startIcon={<EditIcon />}
          onClick={() => handleEdit(params.row._id)}
          style={{ marginRight: "10px", padding: "10px 60px 10px 60px", fontSize: "14px", fontFamily:"Figtree",  }}
        >
          Update
        </Button>
      ),
    },
  ];

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>{error}</Typography>;

  return (
    <Box m="20px">
      <Header title="Services Section" subtitle="View / Update " />

      {/* Render the update form above the table */}
      {isUpdateMode && (
        <Box component="form" onSubmit={handleFormSubmit} sx={{ mb: 3, padding: "20px", border: "1px solid #e0e0e0", borderRadius: "8px", backgroundColor: colors.primary[400], marginTop: "20px", fontFamily:"Figtree",  }}>
          <Typography variant="h4"><b>Update Service </b></Typography>
          <br />
          <TextField
            fullWidth
            label="Header"
            name="header"
            value={currentService.header}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
              style: { color: colors.gray[100], fontSize: "18px", fontFamily:"Figtree",  },
            }}
            sx={{
              "& .MuiInputBase-input": {
                color: colors.gray[100],
                fontSize: "15px",
                fontFamily:"Figtree", 
              },
              "& .MuiOutlinedInput-root fieldset": {
                borderColor: colors.primary[200],
                fontSize: "17px",
                fontFamily:"Figtree", 
              },
            }}
          />
          <br /><br />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={currentService.description}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
              style: { color: colors.gray[100], fontSize: "18px", fontFamily:"Figtree",  },
            }}
            sx={{
              "& .MuiInputBase-input": {
                color: colors.gray[100],
                fontSize: "15px",
                fontFamily:"Figtree", 
              },
              "& .MuiOutlinedInput-root fieldset": {
                borderColor: colors.primary[200],
                fontSize: "17px",
                fontFamily:"Figtree", 
              },
            }}
          /><br /><br />
          <label><p style={{ fontSize: "19px", marginBottom: "0px", marginTop: "0px" }}>Image</p></label>
          <Box display="flex" alignItems="center" mt={2}>
            <input type="file" id="upload-button" style={{ display: "none" }} onChange={handleImageChange} />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Current"
                style={{ width: "300px", height: "auto", borderRadius: "6px", fontFamily:"Figtree",  }}
              />
            )}

            <label htmlFor="upload-button">
              <Button variant="contained" component="span" sx={{ backgroundColor: "#e0e0e0", color: "black", marginTop: "-20px", marginLeft: "20px", marginRight: "20px", "&:hover": { backgroundColor: "#606060", color: "white" }, fontSize: "14px", textTransform: "none", fontFamily:"Figtree",  }}>
                Update Image
              </Button>
            </label>
            <Button type="submit" variant="contained" color="primary" sx={{ backgroundColor: "#32578E", color: "whitesmoke", marginLeft: "50px", marginTop: "-15px", "&:hover": { backgroundColor: "#003366", color: "whitesmoke" }, fontSize: "16px", padding: "15px 70px", textTransform: "none", fontFamily:"Figtree",  }}>
              UPDATE 
            </Button>
          </Box>
        </Box>
      )}

      <Box mt="40px" height="93vh" flex={1} sx={{
        "& .MuiDataGrid-root": { border: "none", fontSize: "0px", color: colors.primary[100], fontFamily:"Figtree",  },
        "& .MuiDataGrid-cell": { border: "none", fontSize: "15px", fontFamily:"Figtree",  },
        "& .MuiDataGrid-columnHeaders": { backgroundColor: "#32578E", borderBottom: "none", fontSize: "19px", fontWeight: "bold", color: "White", fontFamily:"Figtree",  },
        "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400], fontFamily:"Figtree",  },
        "& .MuiDataGrid-footerContainer": { borderTop: "none", backgroundColor: "#32578E", fontFamily:"Figtree",  },
        "& .MuiButton-root": { fontSize: "14px", fontFamily:"Figtree",  },
      }}>
        <DataGrid
          rows={servicesData.map((service) => ({ ...service, id: service._id }))}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[5, 10, 20]}
          pagination
          rowHeight={150} 
        />
      </Box>

      <ToastContainer position="top-center" />
    </Box>
  );
};

export default ViewServices;
