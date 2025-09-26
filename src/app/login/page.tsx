"use client";
import AuthService from "@/libs/AuthService";
import { RegistrationRes } from "@/types/RegisterRes";
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Stack,
  Button,
} from "@mui/material";
import { useState } from "react";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    const response = await AuthService.Login(form);
    if (response.status === 200) {
      const res: RegistrationRes = await response.json();
      console.log("Login success:", res);

      // save token and user
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      // redirect to home
      window.location.href = "/";
    } else {
      alert("Login failed!");
    }
  };

  return (
    <Container maxWidth="sm">
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h5">Login Page</Typography>
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
            <Button variant="contained" onClick={handleLogin}>
              Login
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}
