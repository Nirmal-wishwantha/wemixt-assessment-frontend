import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import instance from '../services/AxiosOder';

export default function LoginPage() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = () => {
        const data = {
            email: email,
            password: password
        };
    
        instance
            .post('/login', data)
            .then((res) => {
                console.log(res);
                localStorage.setItem('wemixt', res.data.data.token);
    
                
                setTimeout(() => {
                    navigate('/main'); 
                }, 2000);
            })
            .catch((err) => {
                console.log(err);
                
            });
    };
    

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',

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

                    <TextField label="Email" variant="outlined" fullWidth onChange={(e) => setEmail(e.target.value)} />
                    <TextField label="Password" variant="outlined" type="password" fullWidth onChange={(e) => setPassword(e.target.value)} />

                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ borderRadius: 2, padding: 1.2, fontSize: 16 }}
                        onClick={login}
                    >
                        Login
                    </Button>
                </Box>

                <Link to={'/register'}>
                    <Typography component="span" color="primary" sx={{ cursor: "pointer" }}>
                        Go to Register page
                    </Typography>
                </Link>
            </Paper>
        </Box>
    );
}
