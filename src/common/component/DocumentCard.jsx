import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, IconButton, Button, TextField } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import instance from '../../services/AxiosOder';
import { Toast } from '../funtion/index';

export default function DocumentCard() {
    const [userId, setUserId] = useState('');
    const [documents, setDocuments] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [documentName, setDocumentName] = useState('');
    const [previewUrl, setPreviewUrl] = useState('');
    const [documentId, setDocumentId] = useState(null);

    useEffect(() => {
        const storedId = localStorage.getItem('wemixt-id');
        if (storedId) {
            setUserId(storedId);
        }
    }, []);

    useEffect(() => {
        if (userId) {
            getDocuments();
        }
    }, [userId]);

    const getDocuments = () => {
        instance.get(`/user/document/${userId}`)
            .then((res) => {
                setDocuments(res.data.documents);
            })
            .catch((err) => {
                console.error('Error fetching documents:', err);
            });
    };

    const handleDownloadClick = (filePath) => {
        fetch(filePath)
            .then((response) => response.blob())
            .then((blob) => {
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = filePath.split('/').pop();
                link.click();
                window.URL.revokeObjectURL(url);
                Toast.fire({ icon: 'success', title: 'Download successful' });
            })
            .catch((error) => {
                console.error('Download failed', error);
                Toast.fire({ icon: 'error', title: 'Download failed' });
            });
    };

    const handleViewClick = (filePath) => {
        window.open(filePath, '_blank');
    };

    const deleteDoc = (id) => {
        instance.delete(`/user/document/${id}`)
            .then(() => {
                getDocuments();
                Toast.fire({ icon: "success", title: "Deleted" });
            })
            .catch(() => {
                Toast.fire({ icon: "error", title: "Delete Failed" });
            });
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
    };

    const handleUpdateClick = (doc) => {
        setDocumentId(doc.id);
        setDocumentName(doc.documentName);
    };

    const uploadDocument = () => {
        if (!selectedFile || !documentName) {
            Toast.fire({ icon: 'error', title: 'Please select a file and enter a name' });
            return;
        }

        const formData = new FormData();
        formData.append('documents', selectedFile);

        instance.post('/user/document/upload', formData)
            .then((res) => {
                const updatedUrl = res.data.document_url;
                if (updatedUrl) {
                    updateDocument(updatedUrl);
                }
            })
            .catch((err) => {
                console.log(err);
                Toast.fire({ icon: "error", title: "Upload Failed" });
            });
    };

    const updateDocument = (url) => {
        const data = { documentPath: url, documentName };

        instance.put(`/user/document/${documentId}`, data)
            .then(() => {
                getDocuments();
                Toast.fire({
                    icon: "success",
                    title: "Update successfully"
                });

                closeUpdateModal();
            })
            .catch(() => {
                Toast.fire({
                    icon: "error",
                    title: "Update faild"
                });
            });
    };

    const closeUpdateModal = () => {
       
            setDocumentId(null);
            setDocumentName('');
            setSelectedFile(null);
            setPreviewUrl('');
            return;
        
       
        
    };

    return (
        <Box>
            <Typography variant="h6" sx={{ textAlign: 'center', mt: 2 }}>
                Uploaded Documents
            </Typography>

            {documentId && (
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1,
                    backgroundColor: 'white',
                    boxShadow: 3,
                    p: 3,
                    borderRadius: 2,
                    width: '400px',
                    textAlign: 'center'
                }}>
                    <Typography variant="h6">Update Document</Typography>

                    {/* Close Button */}
                    <IconButton
                        sx={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                            backgroundColor: '#f44336', 
                            borderRadius: '50%',
                            padding: 1,
                            '&:hover': {
                                backgroundColor: '#d32f2f',
                            },
                        }}
                        onClick={closeUpdateModal}
                    >
                        <CloseIcon sx={{ color: 'white' }} />
                    </IconButton>

                    <input
                        type="file"
                        onChange={handleFileChange}
                        style={{ display: 'block', margin: '10px auto' }}
                    />

                    <TextField
                        label="Document Name"
                        variant="outlined"
                        value={documentName}
                        onChange={(e) => setDocumentName(e.target.value)}
                        sx={{ display: 'block', margin: '10px auto', width: '100%' }}
                    />

                    {previewUrl && (
                        <Box sx={{ mt: 2, border: '1px solid #ddd', padding: 2 }}>
                            <Typography variant="subtitle1">Preview:</Typography>
                            <iframe
                                src={previewUrl}
                                width="100%"
                                height="300px"
                                style={{ border: 'none' }}
                            />
                        </Box>
                    )}

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={uploadDocument}
                        sx={{ mt: 2 }}
                    >
                        Upload & Update
                    </Button>
                </Box>
            )}

            {documents.length > 0 ? (
                documents.map((doc, index) => (
                    <Card key={index} sx={{ margin: 2, padding: 2, boxShadow: 3 }}>
                        <CardContent>
                            <Box sx={{ width: '100%', height: '50vh', border: '1px solid #ddd' }}>
                                <iframe
                                    src={doc.documentPath}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 'none' }}
                                />
                            </Box>

                            <Typography variant="body1">{doc.documentName}</Typography>
                            <Typography variant="body2" color="textSecondary">
                                Uploaded: {new Date(doc.uploadDate).toLocaleString()}
                            </Typography>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                                <IconButton sx={{ color: 'blue' }} onClick={() => handleDownloadClick(doc.documentPath)}>
                                    <DownloadIcon />
                                </IconButton>
                                <IconButton sx={{ color: 'green' }} onClick={() => handleViewClick(doc.documentPath)}>
                                    <VisibilityIcon />
                                </IconButton>
                                <IconButton sx={{ color: 'red' }} onClick={() => deleteDoc(doc.id)}>
                                    <DeleteIcon />
                                </IconButton>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleUpdateClick(doc)}
                                >
                                    Update
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <Typography sx={{ textAlign: 'center', mt: 2 }} color="textSecondary">
                    No documents uploaded yet.
                </Typography>
            )}
        </Box>
    );
}
