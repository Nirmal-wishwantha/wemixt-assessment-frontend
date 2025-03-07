import React from 'react';
import { Card, CardContent, Typography, Avatar, Box } from '@mui/material';

const ProfileCard = ({ user }) => {
    return (
        <Card sx={{ maxWidth: 345, margin: 'auto', padding: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Avatar
                    alt={user.fullName}
                    src={user.profileImage}
                    sx={{ width: 80, height: 80, marginBottom: 2 }}
                />
            </Box>
            <CardContent>
                <Typography variant="h6">{user.fullName}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {user.email}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ProfileCard;
