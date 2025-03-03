import { Box, TextField, Typography, Button } from "@mui/material";
import React from "react";
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import instance from "../services/AxiosOder";
import { Toast } from "../common/funtion";



export default function RegisterPage() {

  const navigate = useNavigate();

  const [name, setName] = useState('');

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [comPassword, setComPassword] = useState('');


  const register = () => {
    if (password !== comPassword) {
      alert("Passwords do not match");
      return;
    }

    const data = {
      fullName: name,
      email: email,
      password: password
    };

    instance
      .post("/register", data)
      .then((res) => {
        console.log(res);

        Toast.fire({
          icon: "success",
          title: "Register in successfully"
        });

        setTimeout(() => {
          navigate("/login");
        }, 2000);

      })

      .catch((err) => {
        console.log(err);

        Toast.fire({
          icon: "error",
          title: "Register in faild"
        });
      });
  };







  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h5" fontWeight="bold" mb={2} textAlign="center">
        Register
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

        <TextField label="Full Name" variant="outlined" fullWidth onChange={(e) => setName(e.target.value)} />
        <TextField label="Email" type="email" variant="outlined" fullWidth onChange={(e) => setEmail(e.target.value)} />

        <TextField label="Password" type="password" variant="outlined" fullWidth onChange={(e) => setPassword(e.target.value)} />

        <TextField label="Conform Password" type="password" variant="outlined" fullWidth onChange={(e) => setComPassword(e.target.value)} />

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
