import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, TextField, Button, Typography, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Header } from '../../components'; 
import { tokens } from '../../theme'; 
import EditIcon from '@mui/icons-material/Edit';
import config from "../../../env";


const ViewHero = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [heroData, setHeroData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [currentHero, setCurrentHero] = useState({
        id: '',
        header: '',
        description: '',
        image: null,
        imageUrl: '',
    });
    const [imagePreview, setImagePreview] = useState("");

    useEffect(() => {
        const fetchHeroData = async () => {
            try {
                const response = await axios.get(`${config.PROJECT_URL}/api/hero`);
                setHeroData(response.data);
            } catch (error) {
                setError('Error fetching hero data.');
            } finally {
                setLoading(false);
            }
        };

        fetchHeroData();
    }, []);

    const handleEdit = (id) => {
        const selectedHero = heroData.find((hero) => hero._id === id);
        setCurrentHero({
            id: selectedHero._id,
            header: selectedHero.header,
            description: selectedHero.description,
            image: null,
            imageUrl: `${config.PROJECT_URL}/uploads/${selectedHero.image}`,
        });
        setImagePreview(`${config.PROJECT_URL}/uploads/${selectedHero.image}`);
        setIsUpdateMode(true);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('header', currentHero.header); // Allowing same header value
        formData.append('description', currentHero.description);
        if (currentHero.image) formData.append('image', currentHero.image);

        try {
            await axios.put(`${config.PROJECT_URL}/api/hero/${currentHero.id}`, formData);
            toast.success('Main Section updated Successfully!');
            
            // Fetch the updated hero data
            const response = await axios.get(`${config.PROJECT_URL}/api/hero`);
            setHeroData(response.data);

            // Reset currentHero state to clear the form and preview
            setCurrentHero({
                id: '',
                header: '',
                description: '',
                image: null,
                imageUrl: '',
            });
            setImagePreview(''); // Reset image preview
        } catch (error) {
            toast.error('Error updating hero section.');
        } finally {
            setIsUpdateMode(false);
        }
    };

    const handleInputChange = (e) => {
        setCurrentHero({
            ...currentHero,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCurrentHero((prev) => ({ ...prev, image: file }));
            setImagePreview(URL.createObjectURL(file)); // Preview the new image
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
                    src={`${config.PROJECT_URL}/uploads/${params.row.image}`} // Ensure image URL is correct
                    alt={params.row.header}
                    style={{ width: "200px", height: "120px", borderRadius: "6px", paddingTop: "4px", paddingBottom: "4px",            fontFamily:"Figtree",
                    }}
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
                    style={{ marginRight: "10px", padding: "10px 60px 10px 60px", fontSize: "15px",            fontFamily:"Figtree",
 }}
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
            <Header title="Main Section" subtitle="View / Update " />

            <Box mt="40px" height="52.5vh" flex={1} sx={{
                "& .MuiDataGrid-root": { border: "none", fontSize: "0px", color: colors.primary[100], fontFamily:"Figtree", },
                "& .MuiDataGrid-cell": { border: "none", fontSize: "15px", fontFamily:"Figtree", },
                "& .MuiDataGrid-columnHeaders": { backgroundColor: "#006666", borderBottom: "none", fontSize: "19px", fontWeight: "bold", color: "White", fontFamily:"Figtree", },
                "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
                "& .MuiDataGrid-footerContainer": { borderTop: "none", backgroundColor: "#006666" },
                "& .MuiButton-root": { fontSize: "14px", fontFamily:"Figtree", },
            }}>
                <DataGrid
                    rows={heroData.map((hero) => ({ ...hero, id: hero._id }))}
                    columns={columns}
                    getRowId={(row) => row._id}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 10 } },
                      }}
                      pageSizeOptions={[5, 10, 20]}
                      pagination
                    rowHeight={130} 
                />
            </Box>

            {/* Update Form */}
            {isUpdateMode && (
                <Box component="form" onSubmit={handleFormSubmit} sx={{ mb: 3, padding: "20px", border: "1px solid #e0e0e0", borderRadius: "8px",          backgroundColor: colors.primary[400],
                    marginTop: "20px", fontFamily:"Figtree", }}>
                    <Typography variant="h4" gutterBottom>
                        <b> Update Main Section</b>
                    </Typography><br />
                    <TextField fullWidth label="Header" name="header" value={currentHero.header} onChange={handleInputChange} InputLabelProps={{
            shrink: true,
            style: { color: colors.gray[100], fontSize: "17px", fontFamily:"Figtree", },
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
        /><br/><br/>
                    <TextField fullWidth label="Description" name="description" value={currentHero.description} onChange={handleInputChange} InputLabelProps={{
            shrink: true,
            style: { color: colors.gray[100], fontSize: "17px", fontFamily:"Figtree", },
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
        /> <br /><br />
                    <label><p style={{ fontSize: "19px", marginBottom: "0px", marginTop: "0px" }}>Image</p></label>
                    <Box display="flex" alignItems="center" mt={2}>
                        {/* Show current image */}
                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt="Current"
                                style={{ width: "300px", height: "auto", borderRadius: "6px" }}
                            />
                        )}
                        <input type="file" id="upload-button" style={{ display: "none" }} onChange={handleImageChange} />
                        <label htmlFor="upload-button">
                            <Button variant="contained" component="span" sx={{ backgroundColor: "#e0e0e0", color: "black", marginTop: "-20px",marginLeft: "20px", fontFamily:"Figtree", marginRight: "20px", "&:hover": { backgroundColor: "#606060", color: "white" }, fontSize: "14px", textTransform: "none", fontFamily:"Figtree", }}>
                                Update Image
                            </Button>
                        </label>
                        <Typography variant="body1" sx={{ marginLeft: "20px", fontSize: "14px", color: "gray", marginTop: "-25px", fontFamily:"Figtree", }}>
                            {currentHero.image ? `${currentHero.image.name} is selected` : "No file selected"}
                        </Typography>
                        <Button type="submit" variant="contained" color="primary" sx={{ backgroundColor: "#006666", color: "whitesmoke", marginLeft: "50px", marginTop: "-15px", "&:hover": { backgroundColor: "#004444", color: "whitesmoke" }, fontSize: "16px", padding: "15px 70px", textTransform: "none", fontFamily:"Figtree", }}>
                            UPDATE 
                        </Button>
                    </Box>
                </Box>
            )}

            <ToastContainer position="top-center" />
        </Box>
    );
};

export default ViewHero;
