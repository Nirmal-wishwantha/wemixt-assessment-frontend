import React, { useState } from "react";
import { Card, CardContent, CardMedia, Box, Button, TextField } from "@mui/material";
import instance from "../../services/AxiosOder";
import { Toast } from "../funtion";
import { useEffect } from "react";

// Function to convert ISO date to YYYY-MM-DD format
const convertToDateOnly = (isoString) => {
  if (!isoString) return ""; 
  const date = new Date(isoString);
  return date.toISOString().split("T")[0]; 
};

const MemberCard = ({ user, onDelete, onUpdate }) => {
  const [fullName, setFullName] = useState(user.fullName || "");
  const [email, setEmail] = useState(user.email || "");
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || "");
  const [address, setAddress] = useState(user.address || "");
  const [dateOfBirth, setDateOfBirth] = useState(convertToDateOnly(user.dateOfBirth) || "");
  const [gender, setGender] = useState(user.gender || "");
  const [bio, setBio] = useState(user.bio || "");
  const [document_url, setUrl] = useState(user.profilePicture || "");
  const [profileImage, setProfileImage] = useState(null); 

  // Handle profile image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
    }
  };

  // Handle profile image upload
  const uplrdProfile = () => {
    const formData = new FormData();
    formData.append("profilePicture", profileImage);

    instance.post("/members/profilePicture", formData)
      .then((res) => {
        setUrl(res.data.document_url);
        Toast.fire({
          icon: "success",
          title: "Profile picture updated successfully",
        });

        setProfileImage(null);
      })
      .catch((err) => {
        console.log(err);
        Toast.fire({
          icon: "error",
          title: "Failed to upload profile picture",
        });
      });
  };

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
      document_url,
    };

    instance.put(`/members/${id}`, data)
      .then((res) => {
        // console.log("Updated successfully", res.data);

        setFullName(res.data.fullName);
        setEmail(res.data.email);
        setPhoneNumber(res.data.phoneNumber);
        setAddress(res.data.address);
        setDateOfBirth(convertToDateOnly(res.data.dateOfBirth));
        setGender(res.data.gender);
        setBio(res.data.bio);

        Toast.fire({
          icon: "success",
          title: "Update successful",
        });

        if (onUpdate) {
          onUpdate();
        }
        window.location.reload();
      })
      .catch((err) => {
        console.error("Update failed", err);
        Toast.fire({
          icon: "error",
          title: "Update failed",
        });
      });
  };

  return (
    <Card sx={{ maxWidth: 400, borderRadius: 3, boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="200"
        width="200"
        image={document_url || user.profilePicture}
        alt="Profile Picture"
        sx={{ objectFit: "cover" }}
      />

      {/* Profile image selection */}
      <Button variant="contained" component="label" sx={{ margin: 2 }}>
        Change Profile Picture
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          hidden
        />
      </Button>
      {profileImage && (
        <Button variant="contained" color="primary" onClick={uplrdProfile} sx={{ margin: 2 }}>
          Upload
        </Button>
      )}

      <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <TextField
          value={fullName || ''}
          onChange={(e) => setFullName(e.target.value)}
          label="Full Name"
          sx={{ margin: 2 }}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />
        <TextField
          value={email || ''}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          sx={{ margin: 2 }}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />
        <TextField
          value={phoneNumber || ''}
          onChange={(e) => setPhoneNumber(e.target.value)}
          label="Phone Number"
          sx={{ margin: 2 }}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />
        <TextField
          value={address || ''}
          onChange={(e) => setAddress(e.target.value)}
          label="Address"
          sx={{ margin: 2 }}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />
        <TextField
          value={dateOfBirth || ''}
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
          value={gender || ''}
          onChange={(e) => setGender(e.target.value)}
          label="Gender"
          sx={{ margin: 2 }}
          select
          SelectProps={{
            native: true,
          }}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </TextField>

        <Box mt={2}>
          <TextField
            rows={5}
            multiline
            value={bio || ''}
            onChange={(e) => setBio(e.target.value)}
            label="Bio"
            sx={{ margin: 2, width: "90%" }}
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
