import { Box, TextField, Typography, Button } from "@mui/material";
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import instance from "../services/AxiosOder";
import { Toast } from "../common/funtion";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [comPassword, setComPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [nameError, setNameError] = useState('');

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const register = () => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setNameError('');

    // Name validation
    if (!name) {
      setNameError('Full Name is required');
      isValid = false;
    }

    // Email validation
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    }

    // Password length validation
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      isValid = false;
    }

    // Confirm password validation
    if (!comPassword) {
      setConfirmPasswordError('Please confirm your password');
      isValid = false;
    } else if (password !== comPassword) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    }

    if (!isValid) return;

    const data = {
      fullName: name,
      email: email,
      password: password
    };

    instance
      .post("users/register", data)
      .then((res) => {
        console.log(res);

        Toast.fire({
          icon: "success",
          title: "Registered successfully"
        });

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);

        Toast.fire({
          icon: "error",
          title: "Registration failed"
        });
      });
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h5" fontWeight="bold" mb={2} textAlign="center">
        Register
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Full Name"
          variant="outlined"
          fullWidth
          required
          onChange={(e) => setName(e.target.value)}
          error={!!nameError}
          helperText={nameError}
        />
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          required
          onChange={(e) => setEmail(e.target.value)}
          error={!!emailError}
          helperText={emailError}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          required
          fullWidth
          onChange={(e) => setPassword(e.target.value)}
          error={!!passwordError}
          helperText={passwordError}
        />
        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          required
          fullWidth
          onChange={(e) => setComPassword(e.target.value)}
          error={!!confirmPasswordError}
          helperText={confirmPasswordError}
        />

        <Button onClick={register} variant="contained" color="primary" fullWidth>
          Register
        </Button>
      </Box>

      <Typography mt={2} textAlign="center">
        Already have an account?{" "}
        <Link to={'/login'}>
          <Typography component="span" color="primary" sx={{ cursor: "pointer" }}>
            Go to login page
          </Typography>
        </Link>
      </Typography>
    </Box>
  );
}
