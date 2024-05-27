import React from "react";
import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
  useMediaQuery,
  Alert,
  Collapse,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const Register = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  //media query
  const isNotMobile = useMediaQuery("(max-width: 1000px)");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //register
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        {
          username,
          email,
          password,
        }
      );
      if (response.data.success) {
        toast.success("User Registered Successfully");
        navigate("/login");
      } else {
        throw new Error("Registration failed");
      }
    } catch (err) {
      console.error("Error during registration:", err);
      const errorMessage =
        err.response && err.response.data && err.response.data.error
          ? err.response.data.error
          : err.message || "Unknown error occurred";
      setError(errorMessage);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <Box
      width={isNotMobile ? "40%" : "35%"}
      p={"2rem"}
      m={"2rem auto"}
      border
      bgcolor={theme.palette.background.alt}
      borderRadius={5}
      sx={{ boxShadow: 5 }}
    >
      <Collapse in={error}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Collapse>

      <form onSubmit={handleSubmit}>
        <Typography variant="h3">Sign Up</Typography>
        <TextField
          label="Username"
          type="username"
          required
          margin="normal"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          label="email"
          type="email"
          required
          margin="normal"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="password"
          type="password"
          required
          margin="normal"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{ color: "white", mt: 2 }}
        >
          Sign Up
        </Button>
        <Typography mt={2} variant="body1">
          Already have an account? <NavLink to="/login">Login here</NavLink>
        </Typography>
      </form>
    </Box>
  );
};
export default Register;
