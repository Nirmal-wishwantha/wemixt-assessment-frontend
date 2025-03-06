import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import instance from '../../services/AxiosOder';
import docu from '../../assets/Daily Report Draft 3,03.pdf';
import { Toast } from '../funtion';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


export default function DocumentCard() {
    const [userId, setUserId] = useState('');

    const [documents, setDocuments] = useState([]);
    const [selectedDocument, setSelectedDocument] = useState(null);

    useEffect(() => {
        const storedId = localStorage.getItem('wemixt-id');
        if (storedId) {
            setUserId(storedId);
        }
    }, []);

    useEffect(() => {
        if (userId) {
            getDocument();
        }
    }, [userId]);



    const getDocument = () => {
        instance
            .get(`/get/${userId}`)

            .then((res) => {
                console.log('Fetched Documents:', res.data.documents);
                setDocuments(res.data.documents);
            })
            .catch((err) => {
                console.error('Error fetching documents:', err);
            });
    };

    const handleDownloadClick = (filePath) => {

        const link = document.createElement('a');
        link.href = filePath;
        link.download = filePath.split('/').pop();
        link.click();

        Toast.fire({
            icon: 'success',
            title: 'Download successful',
        });
    };

    // view
    const handleViewClick = (filePath) => {
        window.open(filePath, '_blank');
    };

    //delete
    const deleteDoc = (id) => {
        instance.delete(`/${id}`)
            .then((res) => {
                console.log(res);
                getDocument();

                Toast.fire({
                    icon: "success",
                    title: "Deleted"
                });
                console.log('delete succes full')
            })
            .catch((err) => {
                console.log(err);

                Toast.fire({
                    icon: "success",
                    title: " Delete Faild"
                });

            })
    }


  




    return (
        <Box>
            <Typography variant="h6" sx={{ textAlign: 'center', mt: 2 }}>
                Uploaded Documents
            </Typography>

            {documents.length > 0 ? (
                documents.map((doc, index) => (
                    <Card key={index} sx={{ margin: 2, padding: 2, boxShadow: 3 }}>
                        <CardContent>
                            <Typography variant="body1">{doc.documentName}</Typography>
                            <Typography variant="body2" color="textSecondary">
                                Uploaded: {new Date(doc.uploadDate).toLocaleString()}
                            </Typography>


                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>

                                {/* downlod */}
                                <IconButton
                                    sx={{
                                        color: 'blue',
                                        '&:hover': { backgroundColor: 'blue', color: 'white' },

                                    }}
                                    onClick={() => handleDownloadClick(doc.documentPath)}
                                >
                                    <DownloadIcon />
                                </IconButton>

                                {/* view */}
                                <IconButton
                                    sx={{
                                        color: 'green',
                                        '&:hover': { backgroundColor: 'green', color: 'white' },

                                    }}
                                    onClick={() => handleViewClick(doc.documentPath)}
                                >
                                    <VisibilityIcon />
                                </IconButton>


                                {/* update */}
                                {/* <IconButton
                                    sx={{
                                        color: 'black',
                                        '&:hover': { backgroundColor: 'black', color: 'white' },

                                    }}
                                onClick={() => handleViewClick(doc.documentPath)}
                                >
                                    <EditIcon />
                                </IconButton> */}

                                {/* delete */}
                                <IconButton
                                    sx={{
                                        color: 'red',
                                        '&:hover': { backgroundColor: 'red', color: 'white' },

                                    }}
                                    onClick={() => deleteDoc(doc.id)}
                                >
                                    <DeleteIcon />
                                </IconButton>

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
