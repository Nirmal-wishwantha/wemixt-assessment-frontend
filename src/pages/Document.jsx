import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Box, TextField } from "@mui/material";
import DocumentCard from "../common/component/DocumentCard";
import instance from "../services/AxiosOder";
import { Toast } from "../common/funtion";

const Document = () => {
    const [open, setOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [userId, setUserId] = useState("");
    const [docName, setDocName] = useState("");
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);

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

    const docUpload = async () => {
        if (!selectedFile) {
            Toast("Please select a file to upload", "error");
            return null;
        }

        try {
            const documents = new FormData();
            documents.append("documents", selectedFile);

            const config = {
                headers: { "Content-Type": "multipart/form-data" },
                onUploadProgress: (progressEvent) => {
                    const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(progress);
                    setIsUploading(true);
                }
            };

            const res = await instance.post("/api/v1/documents", documents, config);

            setIsUploading(false);
            if (res.data && res.data.document_url) {
                return res.data.document_url;
            } else {
                throw new Error("Invalid response structure");
            }
        } catch (err) {
            console.error("File upload failed", err);
            Toast("File upload failed", "error");
            setIsUploading(false);
            return null;
        }
    };

    const pathUpload = async (documentUrl) => {
        if (!documentUrl || !docName.trim() || !userId) {
            Toast("Missing required data", "error");
            return;
        }

        const data = {
            userId: userId,
            document_url: documentUrl,
            documentName: docName,
        };

        try {
            await instance.post("/api/v1/add", data);
            Toast("Document uploaded successfully", "success");
            handleClose();
        } catch (err) {
            console.error("Error storing document details", err);
            Toast("Failed to save document", "error");
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            Toast("Please select a file first", "error");
            return;
        }

        const documentUrl = await docUpload();
        if (documentUrl) {
            await pathUpload(documentUrl);
        }
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
                        <Button onClick={handleUpload} color="primary" disabled={!selectedFile || isUploading}>
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
