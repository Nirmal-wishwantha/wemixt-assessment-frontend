import React, { useState } from "react";
import { Card, CardContent, CardMedia, Box, Button, TextField } from "@mui/material";
import instance from "../../services/AxiosOder";
import { Toast } from "../funtion";
import { useEffect } from "react";

// Function to convert ISO date to YYYY-MM-DD format
const convertToDateOnly = (isoString) => {
  if (!isoString) return ""; // Handle empty or undefined values
  const date = new Date(isoString);
  return date.toISOString().split("T")[0]; // Extract YYYY-MM-DD
};

const MemberCard = ({ user, onDelete, onUpdate }) => {
  const [fullName, setFullName] = useState(user.fullName || "");
  const [email, setEmail] = useState(user.email || "");
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || "");
  const [address, setAddress] = useState(user.address || "");
  const [dateOfBirth, setDateOfBirth] = useState(convertToDateOnly(user.dateOfBirth) || "");
  const [gender, setGender] = useState(user.gender || "");
  const [bio, setBio] = useState(user.bio || "");


  // useEffect = (() => {  }, [user])


  // Handle Update Logic
  const handleUpdate = (id) => {
    const data = {
      fullName,
      email,
      phoneNumber,
      address,
      dateOfBirth,
      gender,
      bio,
    };

    instance
      .put(`/members/${id}`, data)
      .then((res) => {
        console.log("Updated successfully", res.data);

        // Ensure the UI updates by resetting state
        setFullName(res.data.fullName);
        setEmail(res.data.email);
        setPhoneNumber(res.data.phoneNumber);
        setAddress(res.data.address);
        setDateOfBirth(convertToDateOnly(res.data.dateOfBirth));
        setGender(res.data.gender);
        setBio(res.data.bio);

        Toast.fire({
          icon: "success",
          title: "update successfully"
        });
        // Trigger the parent to refresh the list
        if (onUpdate) {
          onUpdate();
          window.location.reload();
        }
      })
      .catch((err) => {
        console.error("Update failed", err);


        Toast.fire({
          icon: "error",
          title: "update Faild"
        });
      });
  };

  return (
    <Card sx={{ maxWidth: 400, borderRadius: 3, boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="200"
        width="200"
        image={user.profilePicture}
        alt="Profile Picture"
        sx={{ objectFit: "cover" }}
      />
      <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <TextField value={fullName} onChange={(e) => setFullName(e.target.value)} label="Full Name" sx={{ margin: 2 }} slotProps={{
          inputLabel: {
            shrink: true,
          },
        }} />
        <TextField value={email} onChange={(e) => setEmail(e.target.value)} label="Email" sx={{ margin: 2 }} slotProps={{
          inputLabel: {
            shrink: true,
          },
        }} />
        <TextField value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} label="Phone Number" sx={{ margin: 2 }} slotProps={{
          inputLabel: {
            shrink: true,
          },
        }} />
        <TextField value={address} onChange={(e) => setAddress(e.target.value)} label="Address" sx={{ margin: 2 }} slotProps={{
          inputLabel: {
            shrink: true,
          },
        }} />
        <TextField
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          label="Date of Birth"
          type="date"
          sx={{ margin: 2 }}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />



        <TextField
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          label="Gender"
          sx={{ margin: 2 }}
          select // Enable the dropdown functionality
          SelectProps={{
            native: true, // Use the native select element for better performance
          }}
          slotProps={{
            inputLabel: {
              shrink: true, // Keeps the label at the top
            },
          }}
        >
          {/* Gender Options */}
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </TextField>


        <Box mt={2}>
          <TextField
            rows={5}
            multiline
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            label="Bio"
            sx={{ margin: 2, width: '90%' }}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
        </Box>
      </CardContent>

      <Box sx={{ display: "flex", justifyContent: "space-between", padding: 2 }}>
        <Button variant="contained" color="error" onClick={onDelete}>
          Delete
        </Button>
        <Button variant="contained" color="primary" onClick={() => handleUpdate(user.id)}>
          Update
        </Button>
      </Box>
    </Card>
  );
};

export default MemberCard;
