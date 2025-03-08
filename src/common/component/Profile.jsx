import React, { useEffect, useState } from 'react';
import { Button, Box, Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress, Typography } from '@mui/material';
import ProfileCard from './ProfileCard';
import instance from '../../services/AxiosOder';

const Profile = () => {
    const [openProfile, setOpenProfile] = useState(false);
    const [user, setUser] = useState(null); // Initialize user state to null

    useEffect(() => {
        const id = localStorage.getItem('wemixt-id');
        if (id) {
            userData(id);
        }
    }, []);

    const userData = async (id) => {
        try {
            const response = await instance.get(`/users/user/${id}`);
            setUser(response.data); // Set user data on success
        } catch (err) {
            console.error("Error fetching user data:", err);
            setUser(null); // In case of an error, set user to null
        }
    };

    const handleProfileClick = () => {
        setOpenProfile(true);
    };

    const handleClose = () => {
        setOpenProfile(false);
    };

    return (
        <Box>
            <Button sx={{ color: 'red' }} onClick={handleProfileClick}>
                Profile
            </Button>

            <Dialog open={openProfile} onClose={handleClose}>
                <DialogTitle>Profile</DialogTitle>
                <DialogContent>
                    {!user ? (
                        <CircularProgress />
                    ) : user ? (
                        <ProfileCard user={user} />
                    ) : (
                        <Typography>No user data available.</Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Profile;
