import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button, Box } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { keyframes, styled } from "@mui/system";

// Keyframes for the tick animation
const tickAnimation = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

// Styled component for the animated tick
const AnimatedTick = styled(CheckCircleOutlineIcon)({
  fontSize: "100px",
  color: "#4CAF50", // Green color for success
  animation: `${tickAnimation} 1s ease-in-out`,
});

const OrderConfirmedPage = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      {/* Animated Tick Icon */}
      <AnimatedTick />

      {/* Success Message */}
      <Typography variant="h4" sx={{ mt: 3, fontWeight: "bold" }}>
        Order Confirmed!
      </Typography>
      <Typography variant="body1" sx={{ mt: 2, color: "text.secondary" }}>
        Thank you for your purchase. Your order has been successfully placed.
      </Typography>

      {/* Back to Home Button */}
      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleBackToHome}
        >
          Back to Home
        </Button>
      </Box>
    </Container>
  );
};

export default OrderConfirmedPage;