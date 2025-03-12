import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOTP } from "../Services/allApi";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const registeredEmail = location.state?.email; // Get email from location state

  const handleVerifyOtp = async () => {
    try {
      const response = await verifyOTP({ email: registeredEmail, otp });
  
      // Store the token and user ID in local storage
      localStorage.setItem('token', response.token);
      localStorage.setItem('userId', response.user.id);
  
      toast.success("Email verified successfully!", { position: "top-right" });
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP!", { position: "top-right" });
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
          Verify Your Email
        </Typography>
        <Box sx={{ width: 320, display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography sx={{ textAlign: "center" }}>
            Enter the OTP sent to <strong>{registeredEmail}</strong>
          </Typography>
          <TextField
            fullWidth
            label="Enter OTP"
            variant="outlined"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            inputProps={{ maxLength: 6 }}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ backgroundColor: "#2563eb", color: "white" }}
            onClick={handleVerifyOtp}
          >
            Verify OTP
          </Button>
        </Box>
      </Box>
      <Footer />
    </div>
  );
};

export default VerifyOtp;