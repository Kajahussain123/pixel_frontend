import React, { useState } from "react";
import { Box, TextField, Button, Typography, InputAdornment, IconButton, CircularProgress } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { register } from "../Services/allApi";
import { Link, useNavigate } from "react-router-dom";
import { googleAuth } from "../Services/allApi";
import googleLogo from '../assets/google.png';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let isValid = true;
    let formErrors = { name: "", email: "", password: "" };

    // Name validation
    if (!formData.name) {
      formErrors.name = "Name is required.";
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email) {
      formErrors.email = "Email is required.";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      formErrors.email = "Invalid email format.";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      formErrors.password = "Password is required.";
      isValid = false;
    } else if (formData.password.length < 6) {
      formErrors.password = "Password must be at least 6 characters.";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSigningUp(true); // Start loading
    try {
      const response = await register(formData);
      toast.success("OTP sent to your email!", { position: "top-right" });
      setTimeout(() => {
        navigate("/verify-otp", { state: { email: formData.email } });
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed!", { position: "top-right" });
    } finally {
      setIsSigningUp(false); // Stop loading
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const response = await googleAuth();
      console.log("Google Signup Response:", response);
      // toast.success("Google signup successful!", { position: "top-right" });
    } catch (error) {
      console.error("Google Signup Error:", error);
      toast.error("Google signup failed!", { position: "top-right" });
    }
  };

  return (
    <div>
      <ToastContainer />
      <Header />
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
          Sign up for an Account
        </Typography>
        <Box sx={{ width: 320, display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            name="name"
            fullWidth
            label="Name"
            variant="outlined"
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            name="email"
            fullWidth
            label="Email"
            variant="outlined"
            onChange={(e) => handleChange({ target: { name: e.target.name, value: e.target.value.toLowerCase() } })}
            error={!!errors.email}
            helperText={errors.email}
          />

          <TextField
            name="password"
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#22c55e",
              color: "white",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#16a34a" },
            }}
            disabled={isSigningUp} 
            onClick={handleSubmit}
          >
           {isSigningUp ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Sign up"}
          </Button>
          <Button
            fullWidth
            variant="outlined"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              borderColor: "#db4437",
              color: "#db4437",
              fontWeight: "bold",
              textTransform: "none",
              "&:hover": { backgroundColor: "#fbe9e7", borderColor: "#c1351d" },
              mt: 1,
              py: 1,
            }}
            onClick={handleGoogleSignup}
          >
            <img
              src={googleLogo}
              alt="Google Logo"
              style={{ width: 20, height: 20 }}
            />
            Continue with Google
          </Button>

          <Typography sx={{ textAlign: "center", mt: 1 }}>
            Already have an account?{" "}
            <Typography
              component={Link}
              to="/login"
              sx={{
                color: "#2563eb",
                cursor: "pointer",
                fontWeight: "bold",
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" }
              }}
            >
              Sign In
            </Typography>
          </Typography>
        </Box>
      </Box>
      <Footer />
    </div>
  );
};

export default Signup;
