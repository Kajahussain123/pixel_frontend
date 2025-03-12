import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Box, Typography, Paper, Container, Grid } from '@mui/material';

const EventSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-in-out', once: true });
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Header Section */}
      <Box 
        data-aos="fade-up"
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          mb: 4 
        }}>
        <Box component="img" 
          src="https://i.postimg.cc/s2b8kMt9/image.png" 
          alt="Left arrow"
          sx={{ width: 50, height: 50 }}
        />
        <Box sx={{ textAlign: 'center', maxWidth: '600px', mx: 'auto' }}>
          <Typography variant="h3" component="h1" 
            data-aos="fade-down"
            sx={{ fontWeight: 'bold', mb: 2, fontSize: { xs: '2rem', md: '2.5rem' },fontFamily: "'Playfair Display', serif", }}>
            We're selling ad space at just $1 per pixel.
          </Typography>
          <Typography variant="body1" color="text.secondary" data-aos="fade-up" sx={{ mb: 4 ,fontFamily: '"Inter", sans-serif'}}>
            It's your chance to showcase your brand, drive engagement, and enjoy viral visibility—all for a tiny investment
          </Typography>
        </Box>
        <Box component="img" 
          src="https://i.postimg.cc/GhsBRV8F/image.png" 
          alt="Right arrow"
          sx={{ width: 50, height: 50 }}
        />
      </Box>

      {/* What is the Event Section */}
      <Typography variant="h4" component="h2" data-aos="fade-right" sx={{ fontWeight: 'bold', mb: 4,fontFamily: "'Playfair Display', serif", }}>
        What is the Event
      </Typography>

      <Grid container spacing={4}>
        {/* Image Column */}
        <Grid item xs={12} md={4} data-aos="fade-up">
          <Box 
            component="img"
            src="https://i.postimg.cc/C539VW3r/32df37c2af8634b8458e3c7e9d86e970.jpg"
            alt="Event illustration"
            sx={{ width: '100%', height: 'auto', maxWidth: '300px', display: 'block', mx: 'auto' }}
          />
        </Grid>

        {/* Cards Column */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            {[
              {
                text: "Our Tech Treasure Hunt is an innovative marketing campaign designed to combine social media engagement with interactive fun."
              },
              {
                text: "Companies purchase ad pixels for $1 each, and users promote those ads to participate in a rewarding challenge."
              },
              {
                text: "This creates a viral ripple effect, giving your brand maximum exposure."
              }
            ].map((card, index) => (
              <Grid item xs={12} md={4} key={index} data-aos="fade-up" data-aos-delay={index * 200}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: 4,
                    backgroundColor: 'white',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      transition: 'transform 0.3s ease-in-out'
                    }
                  }}
                >
                  <Typography variant="body1" style={{ fontFamily: '"Inter", sans-serif' }}>
                    {card.text}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EventSection;
