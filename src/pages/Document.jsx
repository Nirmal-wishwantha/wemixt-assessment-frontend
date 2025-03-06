import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Box, TextField } from "@mui/material";
import DocumentCard from "../common/component/DocumentCard";
import instance from "../services/AxiosOder";
import { Toast } from "../common/funtion";

const Document = () => {
    const [open, setOpen] = useState(false);
    const [userId, setUserId] = useState("");
    const [docName, setDocName] = useState("");
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [url, setUrl] = useState('');

    useEffect(() => {
        const id = localStorage.getItem("wemixt-id");
        if (id) setUserId(id);
    }, []);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setSelectedFile(null);
        setDocName("");
        setOpen(false);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && (file.type === "application/pdf" || file.type.startsWith("image/"))) {
            setSelectedFile(file);
        } else {
            Toast("Only PDF and image files are supported", "error");
        }
    };

    // Upload document with progress tracking
    const docUpload = () => {
        const formData = new FormData();
        formData.append('documents', selectedFile);

        setIsUploading(true);  // Set uploading state to true
        instance.post('/documents', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
            },
            onUploadProgress: (progressEvent) => {
                if (progressEvent.total) {
                    const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(progress);
                }
            }
        })
            .then((res) => {
                setUrl(res.data.document_url);  // Set URL after upload
            })
            .catch((err) => {
                console.error(err);
                setIsUploading(false); // Reset uploading state in case of error
            });
    };

    // Trigger pathSaveDatabase when URL is set
    useEffect(() => {
        if (url) {
            pathSavaDatabase();
        }
    }, [url]);

    // Save document path to the database
    const pathSavaDatabase = () => {
        const data = {
            userId: userId,
            filename: url,
            documentName: docName,
        };
        instance.post('/add', data)
            .then((res) => {
                console.log(res.data);
                window.location.reload();
                
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <Box>
            <Box textAlign="center">
                <Button variant="contained" color="primary" onClick={handleOpen}>
                    Upload Document
                </Button>

                <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                    <DialogTitle>Upload Document</DialogTitle>

                    <DialogContent sx={{ display: 'flex', flexDirection: 'column', marginTop: 2 }}>
                        <TextField
                            label="Document Name"
                            sx={{ margin: 2 }}
                            value={docName}
                            onChange={(e) => setDocName(e.target.value)}
                        />

                        <input
                            type="file"
                            accept=".pdf, image/*"
                            onChange={handleFileChange}
                            style={{ marginTop: 2 }}
                        />

                        {selectedFile && (
                            <Box mt={2}>
                                <Typography variant="body1">Selected: {selectedFile.name}</Typography>
                                {selectedFile.type.startsWith("image/") ? (
                                    <img
                                        src={URL.createObjectURL(selectedFile)}
                                        alt="Preview"
                                        width="100%"
                                        style={{ marginTop: "10px" }}
                                    />
                                ) : selectedFile.type === "application/pdf" ? (
                                    <embed
                                        src={URL.createObjectURL(selectedFile)}
                                        type="application/pdf"
                                        width="100%"
                                        height="200px"
                                    />
                                ) : null}

                                {isUploading && (
                                    <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
                                        Uploading... ({uploadProgress}%)
                                    </Typography>
                                )}
                            </Box>
                        )}
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleClose} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={docUpload} color="primary" disabled={!selectedFile || isUploading}>
                            Upload
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>

            <Box>
                <DocumentCard/>
            </Box>
        </Box>
    );
};

export default Document;
