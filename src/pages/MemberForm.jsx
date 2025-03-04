import React, { useState } from 'react';
import { TextField, Typography, Box, Button, InputLabel, Input, MenuItem } from '@mui/material';

export default function MemberForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
    dateOfBirth: '',
    gender: '',
    bio: '',
    profilePicture: null,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, profilePicture: file });

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', p: 3, boxShadow: 3, borderRadius: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Add Member
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField name="fullName" label="Full Name" value={formData.fullName} onChange={handleChange} required />
        <TextField name="email" label="Email" type="email" value={formData.email} onChange={handleChange} required />
        <TextField name="phoneNumber" label="Phone Number" value={formData.phoneNumber} onChange={handleChange} required />
        <TextField name="address" label="Address" value={formData.address} onChange={handleChange} required />

        <TextField name="dateOfBirth" label="Date of Birth" type="date" InputLabelProps={{ shrink: true }} value={formData.dateOfBirth} onChange={handleChange} required />

        {/* Gender Dropdown */}
        <TextField name="gender" label="Gender" select value={formData.gender} onChange={handleChange} required>
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </TextField>

        <TextField name="bio" label="Bio" multiline rows={3} value={formData.bio} onChange={handleChange} />

        {/* Profile Picture Upload */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <InputLabel sx={{ marginBottom: 1 }}>Profile Picture</InputLabel>
          <Input type="file" onChange={handleProfilePictureChange} />
          {preview && (
            <img src={preview} alt="profile preview" style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: '50%', marginTop: 10 }} />
          )}
        </Box>

        <Button variant="contained" color="primary">Add Member</Button>
      </Box>
    </Box>
  );
}
