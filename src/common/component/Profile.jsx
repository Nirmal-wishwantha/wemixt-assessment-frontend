import React, { useEffect, useState } from 'react';
import { Button, Box, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import ProfileCard from './ProfileCard';
import instance from '../../services/AxiosOder';

const Profile = () => {
    const [openProfile, setOpenProfile] = useState(false);
    const [user, setUser] = useState(null); // Set initial state to null

    useEffect(() => {
        userData();   
    }, []);

    const userData = () => {
        instance.get('/users/user')
            .then((res) => {
                if (res.data && res.data.length > 0) {
                    setUser(res.data[0]); // Extract the first user object
                }
                console.log(res.data);
            })
            .catch((err) => {
                console.error("Error fetching user data:", err);
            });
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

            {/* Dialog to display the profile card */}
            <Dialog open={openProfile} onClose={handleClose}>
                <DialogTitle>Profile</DialogTitle>
                <DialogContent>
                    {user ? <ProfileCard user={user} /> : <p>Loading...</p>}
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
