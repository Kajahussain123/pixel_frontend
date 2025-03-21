import React, { useState } from "react";
import { Box, Grid, TextField, Button, Typography, Paper, IconButton } from "@mui/material";
import { Email, Phone, LocationOn } from "@mui/icons-material";
import { LinkedIn, Instagram, Twitter } from "@mui/icons-material"; // Import social icons

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendMessage = () => {
    const { name, email, subject, message } = formData;
    
    const whatsappMessage = `Hello, my name is ${name}
    Email: ${email}
    Subject: ${subject}
    Message: ${message}`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const phoneNumber = "+919400544260"; 
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <Box sx={{ backgroundColor: "#f8f8f8", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", p: 3 }}>
      <Paper elevation={3} sx={{ maxWidth: 900, width: "100%", borderRadius: 3, overflow: "hidden", p: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", textAlign: "left", mb: 3, fontFamily: "'Playfair Display', serif" }}>
          Contact us
        </Typography>

        <Grid container spacing={3}>
          {/* Left Side - Contact Info + Social Media */}
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2, fontFamily: "'Playfair Display', serif" }}>
                Contact information
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Phone sx={{ mr: 1 }} />
                <Typography>+9194005 44260</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Email sx={{ mr: 1 }} />
                <Typography>plantmyad@gmail.com</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <LocationOn sx={{ mr: 1 }} />
                <Typography>India</Typography>
              </Box>

              {/* Social Media Icons */}
              <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                <IconButton href="https://www.linkedin.com/company/plantmyad/" target="_blank" sx={{ color: "#0077b5" }}>
                  <LinkedIn fontSize="large" />
                </IconButton>
                <IconButton href="https://www.instagram.com/plantmyad?igsh=MTF0b2h5c25oaWFtaw%3D%3D" target="_blank" sx={{ color: "#e4405f" }}>
                  <Instagram fontSize="large" />
                </IconButton>
                <IconButton href="https://x.com/plantmyad?t=wI7esgDEOXfZQaWGIUVz7w&s=08" target="_blank" sx={{ color: "#1da1f2" }}>
                  <Twitter fontSize="large" />
                </IconButton>
              </Box>
            </Paper>
          </Grid>

          {/* Right Side - Contact Form */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, backgroundColor: "#f4f4f4", borderRadius: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    variant="standard"
                    label="Your name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    variant="standard"
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="standard"
                    label="Your subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="standard"
                    label="Message"
                    name="message"
                    multiline
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "#00ff7f", color: "black", fontWeight: "bold", "&:hover": { backgroundColor: "#00cc66" } }}
                    onClick={handleSendMessage}
                  >
                    Send message via WhatsApp
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ContactUs;
