import * as React from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Box,
} from "@mui/material";

export default function MemberUpdateForm({ member, onUpdate }) {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    email: "",
    phoneNumber: "",
    address: "",
    dateOfBirth: "",
    gender: "",
    bio: "",
    profilePicture: null,
  });

  const [preview, setPreview] = React.useState(null);

  // This useEffect will update the form data when 'member' prop changes
  React.useEffect(() => {
    if (member) {
      setFormData({
        email: member.email || "",
        phoneNumber: member.phoneNumber || "",
        address: member.address || "",
        dateOfBirth: member.dateOfBirth ? member.dateOfBirth.split("T")[0] : "",
        gender: member.gender || "",
        bio: member.bio || "",
        profilePicture: null,
      });

      if (member.profilePicture) {
        setPreview(`http://localhost:3000/${member.profilePicture.replace("\\", "/")}`);
      }
    }
  }, [member]);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedData = new FormData();
    Object.keys(formData).forEach((key) => {
      updatedData.append(key, formData[key]);
    });

    console.log("Updated Data:", Object.fromEntries(updatedData.entries()));
    onUpdate(updatedData);
    handleClose();
  };



  
  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Update
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Member</DialogTitle>
        <DialogContent>
          <DialogContentText>Update your details below.</DialogContentText>

          <form onSubmit={handleSubmit}>
            <TextField
              required
              margin="dense"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              value={formData.email}
              onChange={handleChange}
            />

            <TextField
              required
              margin="dense"
              name="phone"
              label="Phone Number"
              type="text"
              fullWidth
              variant="standard"
              value={formData.phoneNumber}
              onChange={handleChange}
            />

            <TextField
              required
              margin="dense"
              name="address"
              label="Address"
              type="text"
              fullWidth
              variant="standard"
              value={formData.address}
              onChange={handleChange}
            />

            <TextField
              required
              margin="dense"
              name="dateOfBirth"
              label="Date of Birth"
              type="date"
              fullWidth
              variant="standard"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />

            {/* Gender Dropdown */}
            <FormControl fullWidth margin="dense" variant="standard">
              <InputLabel>Gender</InputLabel>
              <Select name="gender" value={formData.gender} onChange={handleChange}>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>

            <TextField
              required
              margin="dense"
              name="bio"
              label="Bio"
              multiline
              rows={3}
              fullWidth
              variant="standard"
              value={formData.bio}
              onChange={handleChange}
            />

            {/* Profile Picture Upload */}
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 2 }}>
              <InputLabel>Profile Picture</InputLabel>
              <input type="file" accept="image/*" onChange={handleProfilePictureChange} />
              {preview && (
                <img
                  src={preview}
                  alt="Profile Preview"
                  style={{ width: 300, height: 150, borderRadius: 5, objectFit: 'cover', marginTop: 10 }}
                />
              )}
            </Box>

            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Update</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
