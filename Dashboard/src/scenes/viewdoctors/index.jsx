import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, TextField, Button, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Header } from "../../components"; 
import { tokens } from "../../theme"; 
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "@fontsource/figtree"; // Import the Figtree font
import config from "../../../env";



const ViewDoctors = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [currentDoctor, setCurrentDoctor] = useState(null); 
    const [name, setName] = useState('');
    const [qualification, setQualification] = useState('');
    const [photo, setPhoto] = useState(null);
    
    // States for confirmation dialog
    const [openDialog, setOpenDialog] = useState(false);
    const [doctorToDelete, setDoctorToDelete] = useState(null);

    // Fetch doctors from the backend
    const fetchDoctors = async () => {
        try {
            const response = await axios.get(`${config.PROJECT_URL}/api/doctors`);
            setDoctors(response.data);
        } catch (error) {
            setError('Could not fetch doctors');
        } finally {
            setLoading(false);
        }
    };

    // Open update form with pre-filled data
    const handleUpdateClick = (doctor) => {
        setCurrentDoctor(doctor);
        setName(doctor.name);
        setQualification(doctor.qualification);
        setIsUpdateMode(true);
    };

    // Handle update form submission
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('qualification', qualification);
        if (photo) {
            formData.append('photo', photo);
        }

        try {
            const response = await axios.put(`${config.PROJECT_URL}/api/doctors/${currentDoctor._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const updatedDoctor = response.data;
            setDoctors(doctors.map((doc) => (doc._id === updatedDoctor._id ? updatedDoctor : doc)));
            toast.success('Doctor Updated Successfully!');
            setIsUpdateMode(false);
            setCurrentDoctor(null);
            setName('');
            setQualification('');
            setPhoto(null);
        } catch (error) {
            toast.error('Failed to update doctor.');
        }
    };

    // Open confirmation dialog for deletion
    const confirmDelete = (doctor) => {
        setDoctorToDelete(doctor);
        setOpenDialog(true); // Open the confirmation dialog
    };

    // Handle removal of the doctor
    const handleDeleteDoctor = async () => {
        try {
            await axios.delete(`${config.PROJECT_URL}/api/doctors/${doctorToDelete._id}`);
            setDoctors(doctors.filter((doctor) => doctor._id !== doctorToDelete._id));
            toast.success('Doctor removed successfully!');
        } catch (error) {
            toast.error('Failed to remove doctor.');
        } finally {
            setOpenDialog(false); // Close dialog
            setDoctorToDelete(null); // Clear the doctor to delete
        }
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    // Define columns for DataGrid
    const columns = [
        { 
            field: "name", 
            headerName: "Name", 
            flex: 1, 
            cellClassName: "name-column--cell",
            headerClassName: "header-name", 
            fontFamily: "Figtree",
        },
        { field: "qualification", headerName: "Qualification", flex: 1,            fontFamily: "Figtree",
        },
        {
            field: "photo",
            headerName: "Photo",
            flex: 1,
            fontFamily: "Figtree",

            renderCell: (params) => (
                <img
                    src={`${config.PROJECT_URL}/${params.value}`} 
                    alt={params.row.name}
                    style={{ width: "80px", height: "80px", marginTop:"37px",borderRadius: "4px" }}
                />
            ),
        },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            fontFamily: "Figtree",

            renderCell: (params) => (
                <>
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<EditIcon />}
                        onClick={() => handleUpdateClick(params.row)}
                        style={{ marginRight: "10px",fontFamily: "Figtree", }}
                        
                    >
                        Update
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => confirmDelete(params.row)} 
                        style={{fontFamily: "Figtree", }}
                    >
                        Remove
                    </Button>
                </>
            ),
        },
    ];

    return (
        <Box m="20px">
            <Header title="Doctors Section" subtitle="View / Update / Remove Doctor's" />

            {/* Update Form */}
            {isUpdateMode && (
                <Box component="form" onSubmit={handleUpdateSubmit} sx={{ mb: 3, padding: "20px", border: "1px solid #e0e0e0", borderRadius: "8px", backgroundColor: colors.primary[400], fontFamily: "Figtree", }}>
                    <Typography variant="h4" gutterBottom fontFamily= "Figtree">
                       <b> Update Doctor</b>
                    </Typography>
                    <br />
                    <TextField fullWidth label="Name" value={name} onChange={(e) => setName(e.target.value)} InputLabelProps={{
            shrink: true,
            style: { color: colors.gray[100], fontSize: "17px", fontFamily: "Figtree", },
          }}
          sx={{
            "& .MuiInputBase-input": {
              color: colors.gray[100],
              fontSize: "17.4px",
               fontFamily: "Figtree",
            },
            "& .MuiOutlinedInput-root fieldset": {
              borderColor: colors.primary[200],
              fontSize: "17px",
               fontFamily: "Figtree",
            },
          }}
        /> <br /><br />

                    <TextField fullWidth label="Qualification" value={qualification} onChange={(e) => setQualification(e.target.value)}InputLabelProps={{
            shrink: true,
            style: { color: colors.gray[100], fontSize: "17px" , fontFamily: "Figtree",},
          }}
          sx={{
            "& .MuiInputBase-input": {
              color: colors.gray[100],
              fontSize: "17.4px",
              fontFamily: "Figtree",
            },
            "& .MuiOutlinedInput-root fieldset": {
              borderColor: colors.primary[200],
              fontSize: "17px",
              fontFamily: "Figtree",
            },
          }}
        /><br/><br />
                    <label><p style={{ fontSize: "17px", marginBottom: "0px", marginTop: "0px" }}>Image</p></label>
                    <Box display="flex" alignItems="center" mt={2}>
                        <input type="file" id="upload-button" style={{ display: "none" }} onChange={(e) => setPhoto(e.target.files[0])} />
                        <label htmlFor="upload-button">
                            <Button variant="contained" component="span" sx={{ backgroundColor: "#e0e0e0", color: "black", marginTop: "-20px", "&:hover": { backgroundColor: "#606060", color: "white", }, fontSize: "14px", textTransform: "none",fontFamily: "Figtree", }}>Update Image</Button>
                        </label>
                        <Typography variant="body1" sx={{ marginLeft: "20px", fontSize: "14px", color: "gray", marginTop: "-25px",fontFamily: "Figtree", }}>{photo ? `${photo.name} is uploaded` : "No file updated"}</Typography>
                        <Button type="submit" variant="contained" color="primary" sx={{ backgroundColor: "#009999", color: "whitesmoke", marginLeft:"50px", marginTop: "-15px", "&:hover": { backgroundColor: "#006666", color: "whitesmoke", }, fontSize: "16px", padding: "10px 55px", textTransform: "none",fontFamily: "Figtree", }}>UPDATE DOCTOR</Button>
                    </Box>
                </Box>
            )}

            <Box mt="40px" height="75vh" flex={1} sx={{
                "& .MuiDataGrid-root": { border: "none", fontSize: "0px", color: colors.primary[100], fontFamily:"Figtree", },
                "& .MuiDataGrid-cell": { border: "none", fontSize: "16px", fontFamily:"Figtree", },
                "& .name-column--cell": { color: colors.greenAccent[400], fontSize: "17px", fontFamily:"Figtree", },
                "& .MuiDataGrid-columnHeaders": { backgroundColor: "#009999", borderBottom: "none", fontSize: "19px", fontWeight: "bold", color: "White", fontFamily:"Figtree", },
                "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400], fontFamily:"Figtree", },
                "& .MuiDataGrid-footerContainer": { borderTop: "none", backgroundColor: "#009999", fontFamily:"Figtree", },
                "& .MuiButton-root": { fontSize: "14px", fontFamily:"Figtree", },
            }}>
                <DataGrid
                    rows={doctors}
                    columns={columns}
                    getRowId={(row) => row._id}
                    initialState={{ pagination: { paginationModel: { pageSize: 10, }, }, }}
                    disableSelectionOnClick
                    pageSizeOptions={[5, 10, 20]}
                    rowsPerPageOptions={[5, 10, 20]}
                    pagination
                />
            </Box>

            {/* Confirmation Dialog */}
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{
                    "& .MuiDialog-paper": { backgroundColor: "#f1f1f1", borderRadius: "10px", padding: "17px", fontFamily:"Figtree", },
                    "& .MuiDialogTitle-root": { color: "#333a46", fontWeight: "bold", fontSize: "21px", fontFamily:"Figtree", },
                    "& .MuiDialogContentText-root": { fontSize: "17px", color: "#595C62", fontFamily:"Figtree", }
                }}
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Remove"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to remove Dr. {doctorToDelete?.name}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setOpenDialog(false)}
                        sx={{
                            backgroundColor: "#333a46", color: "whitesmoke", padding: "6px 20px", textTransform: "none",fontSize:"14px", fontFamily:"Figtree",
                            "&:hover": { backgroundColor: "#595C62" },
                        }}>
                        No
                    </Button>
                    <Button
                        onClick={handleDeleteDoctor}
                        sx={{
                            backgroundColor: "#d9534f", color: "whitesmoke", padding: "6px 20px", textTransform: "none", fontSize:"14px", fontFamily:"Figtree",
                            "&:hover": { backgroundColor: "#c9302c" },
                        }}>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>

            <ToastContainer position="top-center" />
        </Box>
    );
};

export default ViewDoctors;





