import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Box, Typography, Grid, Container } from '@mui/material';

const WhatWeOfferSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-in-out', once: true });
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Grid container spacing={4} alignItems="center">
        {/* Left side content */}
        <Grid item xs={12} md={6} data-aos="fade-up">
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 'bold',
              mb: 3,
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontFamily: "'Playfair Display', serif",
            }}
          >
            What We Offer
          </Typography>
          
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              lineHeight: 1.7,
              fontSize: { xs: '1rem', md: '1.1rem' },
              fontFamily: '"Inter", sans-serif'
            }}
            data-aos="fade-up"
          >
            Ads will be displayed on a dynamic event website. Social sharing by participants: Participants must share ads with at least 100 people to qualify for rewards. Become Part of Something Fun and Memorable. This isn't just another ad.
          </Typography>
          
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              mt: 2,
              lineHeight: 1.7,
              fontSize: { xs: '1rem', md: '1.1rem' },
              fontFamily: '"Inter", sans-serif'
            }}
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Your brand becomes part of an exciting journey that people are talking about, engaging with, and sharing with friends. Being part of an innovative event positions your brand as forward-thinking and creative. You'll stand out from competitors and make a lasting impression.
          </Typography>
        </Grid>

        {/* Right side image */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              '& img': {
                width: '100%',
                height: 'auto',
                maxWidth: '500px',
                display: 'block',
                mx: 'auto'
              }
            }}
            data-aos="zoom-in"
          >
            <Box
              component="img"
              src="https://i.postimg.cc/cLWtxTNr/1fdf3542e989e48ee39d3d217e235f29.png"
              alt="Social interaction illustration"
              sx={{
                position: 'relative',
                zIndex: 1
              }}
              data-aos="zoom-in"
              data-aos-delay="500"
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default WhatWeOfferSection;
