import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, TextField, Button } from '@mui/material';
import instance from '../services/AxiosOder';

const EditProfile = () => {
  const [user, setUser] = useState(null);
  const [fullName, setFullName] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    userData();
  }, []);

  const userData = () => {
    instance.get('/users/user')
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setUser(res.data[0]);
          setFullName(res.data[0].fullName);
          setPreviewImage(res.data[0].profileImage);
        }
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      });
  };


  const userUpdate = () => {

    const data = {
      fullName: fullName,
      profileImage: profileImage
    }
    instance.put(`/users/${id}`, data)
      .then((res) => {
        console.log(res)

      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      });


  }
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    const formData = new FormData();
    formData.append('fullName', fullName);
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }

    instance.put('/users/update-profile', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then((res) => {
        console.log('Profile updated:', res.data);
        alert('Profile updated successfully');
      })
      .catch((err) => {
        console.error('Error updating profile:', err);
        alert('Failed to update profile');
      });
  };

  if (!user) return <Typography>Loading...</Typography>;

  return (
    <Card sx={{ maxWidth: '80%', textAlign: 'center', p: 2 }}>
      {/* Profile Image Preview */}
      <CardMedia
        component="img"
        height="140"
        image={previewImage}
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
