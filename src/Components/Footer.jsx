import React from 'react';
import { Box, Typography, Container, Divider, Stack, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#f5f5f5', pt: 4, pb: 3 }}>
      <Container maxWidth="lg">
        {/* Divider line */}
        <Divider sx={{ mb: 4 }} />

        {/* Main footer content */}
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', md: 'center' }
        }}>
          {/* Left side with logo and contact */}
          <Box sx={{ mb: { xs: 3, md: 0 } }}>
            {/* Logo Image */}
            <img
              src="https://i.postimg.cc/HLvgQ9Lw/pixel-logo-removebg-preview.png"  // Replace with your actual logo path
              alt="Company Logo"
              style={{ width: "80px", height: "80px", marginBottom: "8px" }} // Adjust size as needed
            />

            {/* Contact Info */}
            <Stack spacing={1}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontFamily: "'Playfair Display', serif" }}
              >
                PH: +919400544260
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontFamily: "'Playfair Display', serif" }}
              >
                For Enquiries: plantmyad@gmail.com
              </Typography>
            </Stack>
          </Box>


          {/* Right side with links */}
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={{ xs: 1, md: 2 }}
            alignItems={{ xs: 'flex-start', md: 'center' }}
          >
            <Typography variant="body2" color="text.secondary" style={{ fontFamily: "'Playfair Display', serif", }}>
              All rights Reserved | copyrights 2025
            </Typography>
            <Link
              href="/privacy"
              underline="hover"
              color="text.secondary"
              variant="body2"
              style={{ fontFamily: "'Playfair Display', serif", }}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              underline="hover"
              color="text.secondary"
              variant="body2"
              style={{ fontFamily: "'Playfair Display', serif", }}
            >
              Terms and Conditions
            </Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;