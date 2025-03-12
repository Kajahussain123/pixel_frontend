import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  styled,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../Services/allApi";

// Styled component for side arrows
const SideArrow = styled("img")({
  position: "absolute",
  width: "150px",
  height: "auto",
});

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  // Handle login button click
  const handleLogin = async () => {
    // Reset errors
    setEmailError("");
    setPasswordError("");
    setError("");

    // Basic validation for email and password
    let valid = true;
    if (!email) {
      setEmailError("Email is required.");
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email.");
      valid = false;
    }

    if (!password) {
      setPasswordError("Password is required.");
      valid = false;
    }

    if (!valid) return; // Prevent further execution if validation fails

    const reqBody = { email, password };
    try {
      const data = await adminLogin(reqBody); // Call the adminLogin API function
      // Store token in localStorage
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminId", data.admin.id);
      // Redirect to /adminHome
      navigate("/adminHome");
    } catch (error) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div>
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
        {/* Left side arrow */}
        <SideArrow
          src="https://i.postimg.cc/FRtkkdsz/image.png"
          alt="Left arrows"
          style={{ left: -10, top: "50%", transform: "translateY(-50%)" }}
        />

        {/* Right side arrow */}
        <SideArrow
          src="https://i.postimg.cc/ZqzJrr3G/image.png"
          alt="Right arrows"
          style={{ right: 10, top: "50%", transform: "translateY(-50%)" }}
        />

        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
          Login to Your Admin Account
        </Typography>

        <Box
          sx={{
            width: 320,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {error && (
            <Typography variant="body2" color="error" sx={{ mb: 1 }}>
              {error}
            </Typography>
          )}

          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!emailError}
            helperText={emailError}
          />

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!passwordError}
            helperText={passwordError}
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
            onClick={handleLogin}
          >
            Login
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default AdminLogin;
