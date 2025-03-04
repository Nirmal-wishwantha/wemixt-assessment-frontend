import React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";

const MemberCard = ({ user }) => {
  return (
    <Card sx={{ maxWidth: 400, borderRadius: 3, boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="200"
        image={`http://localhost:3000/${user.profilePicture.replace("\\", "/")}`}
        alt="Profile Picture"
        sx={{ objectFit: "cover" }}
      />
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {user.fullName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Email:</strong> {user.email}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Phone:</strong> {user.phoneNumber}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Address:</strong> {user.address}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Date of Birth:</strong> {user.dateOfBirth}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Gender:</strong> {user.gender}
        </Typography>
        <Box mt={2}>
          <Typography variant="body2" color="text.secondary">
            <strong>Bio:</strong> {user.bio}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MemberCard;
