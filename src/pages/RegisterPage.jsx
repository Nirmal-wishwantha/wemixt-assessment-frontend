import { Box, TextField, Typography, Button } from "@mui/material";
import React from "react";

export default function RegisterPage() {
  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h5" fontWeight="bold" mb={2} textAlign="center">
        Register
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField label="Full Name" variant="outlined" fullWidth />
        <TextField label="Email" type="email" variant="outlined" fullWidth />

        <TextField label="Password" type="password" variant="outlined" fullWidth />

        <TextField label="Conform Password" type="password" variant="outlined" fullWidth />

        <Button variant="contained" color="primary" fullWidth>
          Register
        </Button>
      </Box>

      <Typography mt={2} textAlign="center">
        Already have an account?{" "}
        <Typography component="span" color="primary" sx={{ cursor: "pointer" }}>
          Go to login page
        </Typography>
      </Typography>
    </Box>
  );
}
