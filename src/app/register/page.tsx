"use client";
import AuthService from "@/libs/AuthService";
import { RegisterForm } from "@/types/RegisterForm";
import { RegistrationRes } from "@/types/RegisterRes";
import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Stack,
  Button,
} from "@mui/material";
import { useState } from "react";

export default function RegisterPage() {
  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    if (registerForm.password !== registerForm.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const data: RegisterForm = {
      username: registerForm.username,
      email: registerForm.email,
      password: registerForm.password,
    };

    const response = await AuthService.Register(data);
    if (response.status === 201) {
      const res: RegistrationRes = await response.json();
      console.log("Register success:", res);
      window.location.href = "/login";
    } else {
      alert("Register failed!");
    }
  };

  return (
    <Container maxWidth="sm">
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h5">Register Page</Typography>
            <TextField
              label="Username"
              name="username"
              fullWidth
              onChange={handleChange}
            />
            <TextField
              label="Email"
              name="email"
              fullWidth
              onChange={handleChange}
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              fullWidth
              onChange={handleChange}
            />
            <TextField
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              fullWidth
              onChange={handleChange}
            />
            <Button variant="contained" onClick={handleRegister}>
              Register
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}
