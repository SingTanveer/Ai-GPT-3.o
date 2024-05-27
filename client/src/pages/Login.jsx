import React from "react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
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

const Login = () => {
  const theme = useTheme();

  const navigate = useNavigate();
  //media query
  const isNotMobile = useMediaQuery("(max-width: 1000px)");
  //states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //Login control
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const value = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password,
      });
      if (value.data.token) {
        localStorage.setItem("authToken", true);
        toast.success("Login Successfully");
        navigate("/");
      } else {
        throw new Error("login failed: token not found");
      }
    } catch (err) {
      console.log("there is some error in this line", err);
      if (error.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("unkonwn error occured");
      }
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
        <Typography variant="h3">Sign In</Typography>

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
          Sign In
        </Button>
        <Typography mt={2} variant="body1">
          Create account here?
          <NavLink to="/register">Register here</NavLink>
        </Typography>
      </form>
    </Box>
  );
};
export default Login;
