import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Container, Grid, Typography, Card, CardContent, CardMedia } from '@mui/material';

const steps = [
  {
    icon: '🖱',
    title: 'Choose a Pixel',
    description: [
      'Visit the event grid and click on a pixel to reveal what’s inside.',
    ],
  },
  {
    icon: '🎬',
    title: 'View the Ad',
    description: ['Watch the ad (poster or video) attached to the pixel.'],
  },
  {
    icon: '📤',
    title: 'Share to Unlock Rewards',
    description: [
      'Download and share the ad on Instagram, WhatsApp, or other platforms.',
      'Submit a screenshot as proof.',
    ],
  },
  {
    icon: '🎉',
    title: 'Scratch & Win',
    description: [
      'After verification, scratch the card to reveal your reward or treasure!',
    ],
  },
];

const HowItWorksDesign1 = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <Container style={{ position: 'relative', marginTop: '90px', maxWidth: '90%', margin: '0 auto', marginBottom: '30px' }}>
      <Typography 
        variant="h6" 
        fontWeight="bold" 
        gutterBottom 
        style={{ fontFamily: "'Playfair Display', serif", textAlign:"center",marginTop:"30px" }} 
        data-aos="fade-down"
      >
        Step 1: For Participants
      </Typography>

      {/* Top Center Card with Image */}
      <Grid container justifyContent="center" style={{ marginBottom: '20px' }} data-aos="zoom-in">
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ maxWidth: 400, margin: '0 auto' }}>
            <CardMedia
              component="img"
              height="350"
              image="https://i.postimg.cc/x1gHHsJZ/Screenshot-2025-02-03-152358.png"
              alt="Top Center Image"
            />
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} justifyContent="center">
        {steps.map((step, index) => (
          <Grid item xs={12} sm={6} key={index} data-aos="fade-up">
            <Card variant="outlined" sx={{ maxWidth: 400, margin: '0 auto', borderRadius: "20px" }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {step.icon} {step.title}
                </Typography>
                <ul style={{ fontFamily: '"Inter", sans-serif' }}>
                  {step.description.map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HowItWorksDesign1;
