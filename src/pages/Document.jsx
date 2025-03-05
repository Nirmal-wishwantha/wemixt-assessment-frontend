import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Box } from "@mui/material";
import DocumentCard from "../common/component/DocumentCard";
import instance from "../services/AxiosOder";

const Document = () => {
    const [open, setOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadedFileName, setUploadedFileName] = useState("");
    const [userId, setUserId] = useState("");

    // Get user ID from local storage
    useEffect(() => {
        const id = localStorage.getItem("wemixt-id");
        setUserId(id);
    }, []);

    // Open & Close Dialog
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setSelectedFile(null);
        setOpen(false);
    };

    // Handle File Selection
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    // Handle File Upload
    const handleUpload = () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append("document", selectedFile);
        formData.append("user_id", userId);

        instance
            .post("/document/add", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                console.log("Upload Success:", res.data);
                setUploadedFileName(selectedFile.name);
                setSelectedFile(null);
                handleClose();
            })
            .catch((err) => {
                console.error("Upload Error:", err);
            });
    };

    return (
        <Box>
            <Box textAlign="center">
                {/* Upload Button */}
                <Button variant="contained" color="primary" onClick={handleOpen}>
                    Upload Document
                </Button>

                {/* Show Uploaded Document Name */}
                {uploadedFileName && (
                    <Typography mt={2} color="textSecondary">
                        Uploaded: {uploadedFileName}
                    </Typography>
                )}

                {/* Upload Dialog */}
                <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                    <DialogTitle>Upload Document</DialogTitle>
                    <DialogContent>
                        <input type="file" accept=".pdf, image/*" onChange={handleFileChange} />

                        {/* Preview Document */}
                        {selectedFile && (
                            <Box mt={2}>
                                <Typography variant="body1">Selected: {selectedFile.name}</Typography>
                                {selectedFile.type.startsWith("image/") ? (
                                    <img src={URL.createObjectURL(selectedFile)} alt="Preview" width="100%" style={{ marginTop: "10px" }} />
                                ) : selectedFile.type === "application/pdf" ? (
                                    <embed src={URL.createObjectURL(selectedFile)} type="application/pdf" width="100%" height="200px" />
                                ) : null}
                            </Box>
                        )}
                    </DialogContent>

                    {/* Upload & Close Buttons */}
                    <DialogActions>
                        <Button onClick={handleClose} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={handleUpload} color="primary" disabled={!selectedFile}>
                            Upload
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>

            <Box>
                <DocumentCard />
            </Box>
        </Box>
    );
};

export default Document;
