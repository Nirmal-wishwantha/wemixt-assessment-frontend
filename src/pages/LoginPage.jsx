import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import React, { useState } from 'react';

export default function LoginPage() {

    const [email,setEmail]=useState('');
    const[password,setPassword]=useState('');

    
    return (
        <Box 
            sx={{ 
                height: '100vh', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                background: 'linear-gradient(to right, #6a11cb, #2575fc)' 
            }}
        >
            <Paper 
                elevation={6} 
                sx={{ 
                    padding: 4, 
                    width: 350, 
                    borderRadius: 3, 
                    textAlign: 'center', 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)' 
                }}
            >
                <Typography variant="h5" fontWeight="bold" mb={2} color="primary">
                    Welcome Back
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField label="Email" variant="outlined" fullWidth />
                    <TextField label="Password" variant="outlined" type="password" fullWidth />
                    <Button 
                        variant="contained" 
                        color="primary" 
                        sx={{ borderRadius: 2, padding: 1.2, fontSize: 16 }}
                    >
                        Login
                    </Button>
                </Box>

                <Typography variant="body2" sx={{ marginTop: 2, color: 'gray' }}>
                    Don't have an account? <span style={{ color: '#6a11cb', cursor: 'pointer' }}>Register</span>
                </Typography>
            </Paper>
        </Box>
    );
}
