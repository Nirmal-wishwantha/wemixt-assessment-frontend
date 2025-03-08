import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, TextField, Button } from '@mui/material';
import instance from '../services/AxiosOder';

const EditProfile = () => {
  const [user, setUser] = useState(null); 
  const [fullName, setFullName] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    const id = localStorage.getItem('wemixt-id');
    if (id) {
      userData(id);
    }
  }, []);

  const userData = (id) => {
    instance.get(`/users/user/${id}`)
      .then((res) => {
        setUser(res.data);
        setFullName(res.data.fullName); // Prepopulate full name
        setPreviewImage(res.data.profileImage); // Prepopulate profile image URL
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const id = localStorage.getItem('wemixt-id');
    if (id) {
      const formData = new FormData();
      formData.append('fullName', fullName);
      if (profileImage) {
        formData.append('profileImage', profileImage);
      }

      // You would need to implement the update endpoint
      instance.put(`/users/user/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((res) => {
          console.log('Profile updated:', res.data);
          // Optionally handle success (e.g., show a success message)
        })
        .catch((err) => {
          console.error("Error saving profile data:", err);
        });
    }
  };

  if (!user) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Card sx={{ maxWidth: '80%', textAlign: 'center', p: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image={previewImage || 'default-profile-image.png'} // fallback to a default image
        alt={user.fullName}
        sx={{ borderRadius: '50%', width: 200, height: 200, mx: 'auto', my: 2 }}
      />

      <CardContent>
        {/* Change Profile Image */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ marginBottom: '10px' }}
        />

        {/* Change Name */}
        <TextField
          fullWidth
          label="Full Name"
          variant="outlined"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          sx={{ my: 2 }}
        />

        {/* Save Button */}
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </CardContent>
    </Card>
  );
};

export default EditProfile;
