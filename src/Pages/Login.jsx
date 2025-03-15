import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, InputAdornment, IconButton, styled } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { googleAuth, login } from "../Services/allApi";
import Loader from "../Components/Loader/Loader";
import googleLogo from '../assets/google.png';

const SideArrow = styled("img")({
  position: "absolute",
  width: "150px",
  height: "auto",
  zIndex: -1, // Move to the back
});


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let valid = true;
    let emailError = "";
    let passwordError = "";

    // Email validation (basic format check)
    if (!formData.email) {
      emailError = "Email is required.";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      emailError = "Please enter a valid email address.";
      valid = false;
    }

    // Password validation
    if (!formData.password) {
      passwordError = "Password is required.";
      valid = false;
    }

    setErrors({ email: emailError, password: passwordError });
    return valid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const data = await login(formData);
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("token", data.token);
        toast.success("Login successful!", { position: "top-right" });
        navigate("/");
      } catch (error) {
        toast.error("Login failed. Please check your Email or Password.", { position: "top-right" });
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const response = await googleAuth();
      console.log("Google Signup Response:", response); 
      // toast.success("Google Login successful!", { position: "top-right" });
    } catch (error) {
      console.error("Google Signup Error:", error); // Log the error
      toast.error("Google Login failed!", { position: "top-right" });
    }
  };

  

  return (
    <div>
      <ToastContainer />
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <Box
            sx={{
              width: "100%",
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              position: "relative",
            }}
          >
            <SideArrow
              src="https://i.postimg.cc/FRtkkdsz/image.png"
              alt="Left arrows"
              style={{ left: -10, top: "50%", transform: "translateY(-50%)" }}
            />
            <SideArrow
              src="https://i.postimg.cc/ZqzJrr3G/image.png"
              alt="Right arrows"
              style={{ right: 10, top: "50%", transform: "translateY(-50%)" }}
            />

            <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
              Login to Your Account
            </Typography>

            <Box
              sx={{
                width: 320,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
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
                onClick={handleSubmit}
              >
                Login
              </Button>

              {/* Google Login Button */}
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
                  py: 1, // Adjust padding for a smaller look
                }}
                onClick={handleGoogleLogin}
              >
                <img
                  src={googleLogo}
                  alt="Google Logo"
                  style={{ width: 20, height: 20 }}
                />
                Continue with Google
              </Button>

              <Typography sx={{ textAlign: "center", mt: 1 }}>
                Don't have an account?{" "}
                <Typography
                  component={Link}
                  to="/register"
                  sx={{
                    color: "#2563eb",
                    cursor: "pointer",
                    fontWeight: "bold",
                    textDecoration: "none",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  Sign up
                </Typography>
              </Typography>
            </Box>
          </Box>
          <Footer />
        </>
      )}
    </div>
  );
};

export default Login;
