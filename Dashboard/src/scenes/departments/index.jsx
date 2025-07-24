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


const ViewDepartments = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [departmentsData, setDepartmentsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [currentDepartment, setCurrentDepartment] = useState({
    id: '',
    name: '',
    description: '',
    image: null,
    imageUrl: '',
  });
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    const fetchDepartmentsData = async () => {
      try {
        const response = await axios.get(`${config.PROJECT_URL}/api/departments`);
        setDepartmentsData(response.data);
      } catch (error) {
        setError('Error fetching departments data.');
      } finally {
        setLoading(false);
      }
    };

    fetchDepartmentsData();
  }, []);

  const handleEdit = (id) => {
    const selectedDepartment = departmentsData.find((department) => department._id === id);
    setCurrentDepartment({
      id: selectedDepartment._id,
      name: selectedDepartment.name,
      description: selectedDepartment.description,
      image: null, // Initially set to null
      imageUrl: `${config.PROJECT_URL}/uploads/${selectedDepartment.image}`,
    });
    setImagePreview(`${config.PROJECT_URL}/uploads/${selectedDepartment.image}`);
    setIsUpdateMode(true);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', currentDepartment.name);
    formData.append('description', currentDepartment.description);

    // Only append the image if a new one is selected
    if (currentDepartment.image) {
      formData.append('image', currentDepartment.image);
    }

    try {
      await axios.put(`${config.PROJECT_URL}/api/departments/${currentDepartment.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Department updated successfully!');

      // Reload the updated data
      const response = await axios.get(`${config.PROJECT_URL}/api/departments`);
      setDepartmentsData(response.data);
      setCurrentDepartment({ id: '', name: '', description: '', image: null, imageUrl: '' });
      setImagePreview('');
    } catch (error) {
      toast.error('Error updating department.');
    } finally {
      setIsUpdateMode(false);
    }
  };

  const handleInputChange = (e) => {
    setCurrentDepartment({ ...currentDepartment, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCurrentDepartment((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file)); // Preview the selected image
    }
  };

  const columns = [
    { field: 'name', headerName: 'Name', flex: 1 }, // Changed "header" to "name"
    { field: 'description', headerName: 'Description', flex: 2 },
    {
      field: 'image',
      headerName: 'Image',
      flex: 1,
      renderCell: (params) => (
        <img
          src={`${config.PROJECT_URL}/uploads/${params.row.image}`}
          alt={params.row.name}
          style={{ width: '150px', height: '90px', borderRadius: '6px', fontFamily:"Figtree",  }}
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
          style={{ marginRight: "10px", padding: "10px 60px 10px 60px", fontSize: "15px", fontFamily:"Figtree",  }}
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
      <Header title="Departments Section" subtitle="View / Update" />

      {/* Render the update form above the table */}
      {isUpdateMode && (
        <Box component="form" onSubmit={handleFormSubmit} sx={{ mb: 3, padding: "20px", border: "1px solid #e0e0e0", borderRadius: "8px", backgroundColor: colors.primary[400], marginTop: "20px" }}>
          <Typography variant="h4"><b>Update Department </b></Typography>
          <br />
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={currentDepartment.name}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
              style: { color: colors.gray[100], fontSize: "17px", fontFamily:"Figtree",  },
            }}
            sx={{
              "& .MuiInputBase-input": {
                color: colors.gray[100],
                fontSize: "15px",
                fontFamily:"Figtree", 
              },
              "& .MuiOutlinedInput-root fieldset": {
                borderColor: colors.primary[200],
                fontSize: "17px", fontFamily:"Figtree", 
              },
            }}
          />
          <br /><br />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={currentDepartment.description}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
              style: { color: colors.gray[100], fontSize: "17px", fontFamily:"Figtree",  },
            }}
            sx={{
              "& .MuiInputBase-input": {
                color: colors.gray[100],
                fontSize: "15px", fontFamily:"Figtree", 
              },
              "& .MuiOutlinedInput-root fieldset": {
                borderColor: colors.primary[200],
                fontSize: "17px", fontFamily:"Figtree", 
              },
            }}
          /><br /><br />
          <label><p style={{ fontSize: "19px", marginBottom: "0px", marginTop: "0px", fontFamily:"Figtree",  }}>Image</p></label>
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
            <Button type="submit" variant="contained" color="primary" sx={{ backgroundColor: "#99004c", color: "whitesmoke", marginLeft: "50px",  fontFamily:"Figtree", marginTop: "-15px", "&:hover": { backgroundColor: "#73033B", color: "whitesmoke" }, fontSize: "16px", padding: "15px 70px", textTransform: "none" }}>
              UPDATE DEPARTMENT
            </Button>
          </Box>
        </Box>
      )}

      <Box mt="40px" height="75vh" flex={1} sx={{
        "& .MuiDataGrid-root": { border: "none", fontSize: "0px", color: colors.primary[100], fontFamily:"Figtree",  },
        "& .MuiDataGrid-cell": { border: "none", color: colors.primary[100], fontFamily:"Figtree",  },
        "& .MuiDataGrid-columnHeaders": { backgroundColor: "#99004c", borderBottom: "none", fontSize: "19px", fontWeight: "bold", color: "White", fontFamily:"Figtree",  },
        "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400], fontSize: "16.5px", fontFamily:"Figtree",  },
        "& .MuiDataGrid-footerContainer": { borderTop: "none", backgroundColor: "#99004c", fontFamily:"Figtree",  },
        "& .MuiCheckbox-root": { color: `${colors.greenAccent[200]}` }
      }}>
        <DataGrid rows={departmentsData} columns={columns} getRowId={(row) => row._id}
         initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[5, 10, 20]}
        pagination
        rowHeight={150} />
      </Box>

      <ToastContainer position="top-center" />
    
    </Box>
  );
};

export default ViewDepartments;
