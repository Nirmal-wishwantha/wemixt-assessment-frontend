import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import instance from '../../services/AxiosOder';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import docu from '../../assets/Daily Report Draft 3,03.pdf';
import { pdfjs } from 'reat-pdf';

// Configure the workerSrc globally
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

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
            .get(`/document/user/${userId}`)
            .then((res) => {
                console.log('Fetched Documents:', res.data);
                setDocuments(res.data);
            })
            .catch((err) => {
                console.error('Error fetching documents:', err);
            });
    };

    const document = [
        {
            fileName: 'Resume',
            uploadDate: '2024-05-08',
            filePath: docu,
        },
    ];

    const handleDocumentClick = (filePath) => {
        setSelectedDocument(filePath);
    };

    return (
        <Box>
            <Typography variant="h6" sx={{ textAlign: 'center', mt: 2 }}>
                Uploaded Documents
            </Typography>

            {document.length > 0 ? (
                document.map((doc, index) => (
                    <Card
                        key={index}
                        sx={{ margin: 2, padding: 2, boxShadow: 3 }}
                        onClick={() => handleDocumentClick(doc.filePath)}
                    >
                        <CardContent>
                            <Typography variant="body1">{doc.fileName}</Typography>
                            <Typography variant="body2" color="textSecondary">
                                Uploaded: {new Date(doc.uploadDate).toLocaleString()}
                            </Typography>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <Typography sx={{ textAlign: 'center', mt: 2 }} color="textSecondary">
                    No documents uploaded yet.
                </Typography>
            )}

            {selectedDocument && (
                <Box sx={{ marginTop: 4 }}>
                    <Typography variant="h6" sx={{ textAlign: 'center' }}>
                        PDF Preview
                    </Typography>
                    <div style={{ width: '100%', height: '600px' }}>
                        <Viewer fileUrl={selectedDocument} />
                    </div>
                </Box>
            )}
        </Box>
    );
}
