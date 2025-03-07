import React, { useEffect, useState } from 'react';
import { TextField, Typography, Box, Button, InputLabel, Input, MenuItem } from '@mui/material';
import instance from '../services/AxiosOder';
import { Toast } from '../common/funtion';

export default function MemberForm() {
    const [preview, setPreview] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null);
    const [url, setUrl] = useState('');

    // Controlled inputs with default values
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');
    const [bio, setBio] = useState('');

    const [userId, setUserId] = useState('');

    useEffect(() => {
        const userIdNumber = localStorage.getItem('wemixt-id') || ''; // Ensure it's not null
        setUserId(userIdNumber);
    }, []);

    const handleProfilePictureChange = (event) => {
        const file = event.target.files[0];

        if (file && file.type === 'image/jpeg') {
            setProfilePicture(file);
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        } else {
            alert('Please select a valid JPG image');
        }
    };

    const profileUpload = async () => {
        if (!profilePicture) {
            alert('Please select a profile picture');
            return;
        }

        const formData = new FormData();
        formData.append('profilePicture', profilePicture);

        // console.log([...formData.entries()]); 

        try {
            const res = await instance.post('/members/profilePicture', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            // console.log(res.data);
            setUrl(res.data.document_url);
            memberAdd(res.data.document_url); 
        } catch (err) {
            console.error(err);
            Toast.fire({ icon: "error", title: "Profile upload failed" });
        }
    };

    const memberAdd = async (imageUrl) => {
        const data = {
            fullName,
            email,
            phoneNumber,
            address,
            dateOfBirth,
            gender,
            bio,
            profilePicture: imageUrl // Ensure it's coming from the upload
        };

        try {
            const res = await instance.post(`/members/add/${userId}`, data);
            console.log(res.data);
            Toast.fire({ icon: "success", title: "Member added successfully" });

            // Clear input fields after success
            setFullName('');
            setEmail('');
            setPhoneNumber('');
            setAddress('');
            setDateOfBirth('');
            setGender('');
            setBio('');
            setProfilePicture(null);
            setPreview(null);
            setUrl('');
        } catch (err) {
            console.error(err);
            Toast.fire({ icon: "error", title: "Member addition failed" });
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', p: 3, boxShadow: 3, borderRadius: 3 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>Add Member</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField name="fullName" label="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                <TextField name="email" label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <TextField name="phoneNumber" label="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                <TextField name="address" label="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />

                <Typography>Birth Day</Typography>
                <TextField name="dateOfBirth" type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required />

                <TextField name="gender" label="Gender" select value={gender} onChange={(e) => setGender(e.target.value)} required>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                </TextField>

                <TextField name="bio" label="Bio" multiline rows={3} value={bio} onChange={(e) => setBio(e.target.value)} />

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <InputLabel sx={{ marginBottom: 1 }}>Profile Picture</InputLabel>
                    <Input type="file" accept="image/jpeg" onChange={handleProfilePictureChange} />
                    {preview && (
                        <img src={preview} alt="profile preview" style={{ width: 300, height: 150, borderRadius: 5, objectFit: 'cover', marginTop: 10 }} />
                    )}
                </Box>

                <Button onClick={profileUpload} variant="contained" color="primary">
                    Upload & Add Member
                </Button>
            </Box>
        </Box>
    );
}
