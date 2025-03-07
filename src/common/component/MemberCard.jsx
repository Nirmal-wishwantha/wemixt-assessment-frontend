import React, { useState } from "react";
import { Card, CardContent, CardMedia, Typography, Box, Button } from "@mui/material";
import instance from "../../services/AxiosOder";
import { Toast } from "../funtion";
import MemberUpdateForm from "./MemberUpadateForm";

const MemberCard = ({ user ,onDelete}) => {


  
  const handleUpdate = (updatedData) => {
    console.log(updatedData); 
    
  };

  return (
    <Card sx={{ maxWidth: 400, borderRadius: 3, boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="200"
        width="200"
        image={user.profilePicture ? `http://localhost:3000/images/${user.profilePicture}` : "/default-profile.png"}
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

      <Box sx={{ display: "flex", justifyContent: "space-between", padding: 2 }}>
        <Button variant="contained" color="error" onClick={onDelete}>
          Delete
        </Button>
        
        <MemberUpdateForm member={user} onUpdate={handleUpdate} />
        
      </Box>
    </Card>
  );
};

export default MemberCard;
