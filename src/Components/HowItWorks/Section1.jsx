import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Container, Grid, Typography, Card, CardContent, Button } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const steps = [
  {
    icon: '📦',
    title: 'Buy Pixels',
    description: [
      'Purchase as many advertising pixels as you need for $1 per pixel.',
      'More pixels = More ad space.',
    ],
  },
  {
    icon: '🎥',
    title: 'Submit Your Ad',
    description: ['Upload your poster or 30-second video to be displayed.'],
  },
  {
    icon: '🌐',
    title: 'Get Featured',
    description: [
      'Your ad will be placed on our interactive event website.',
      'Guaranteed 101 views per pixel.',
    ],
  },
  {
    icon: '🚀',
    title: 'Go Viral',
    description: [
      'Participants share your ad on social media, amplifying your reach!',
    ],
  },
];

const SideArrow = styled('img')({
  position: 'absolute',
  height: '100vh',
  minWidth: 'auto',
  objectFit: 'cover',
  top: 0,
  zIndex: -1,
});

const HowItWorksDesign = () => {
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  const navigate = useNavigate();
  const token = localStorage.getItem("userId"); // Check for token

  const handleButtonClick = () => {
    if (token) {
      navigate("/buynow"); // If token exists, go to Buy Now
    } else {
      navigate("/login"); // If no token, go to Login
    }
  };

  return (
    <Container
      data-aos="fade-up"
      style={{
        position: 'relative',
        marginTop: '40px',
        maxWidth: '100%',
        margin: '0 auto',
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        style={{ fontFamily: "'Playfair Display', serif", marginTop: '30px' }}
        data-aos="fade-down"
      >
        How it works
      </Typography>
      <Typography
        variant="h6"
        fontWeight="bold"
        gutterBottom
        style={{ fontFamily: "'Playfair Display', serif" }}
        data-aos="fade-right"
      >
        Step 1: For Companies
      </Typography>

      <SideArrow
        src="https://i.postimg.cc/FRtkkdsz/image.png"
        alt="Left arrows"
        style={{ left: 0 }}
        data-aos="fade-right"
        data-aos-delay="500"
      />

      <SideArrow
        src="https://i.postimg.cc/ZqzJrr3G/image.png"
        alt="Right arrows"
        style={{ right: 0 }}
        data-aos="fade-left"
        data-aos-delay="500"
      />

      <Grid container spacing={3} justifyContent="center">
        {steps.map((step, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Card
              variant="outlined"
              sx={{
                maxWidth: 400,
                margin: '0 auto',
                borderRadius: '20px',
              }}
              data-aos="zoom-in"
              data-aos-delay={index * 200}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
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

      {/* Buy Now Button */}
      <Button
        variant="contained"
        onClick={handleButtonClick}
        sx={{
          backgroundColor: '#14FD79',
          color: '#000',
          fontWeight: 'bold',
          fontSize: '18px',
          borderRadius: '25px',
          padding: '10px 30px',
          marginTop: '30px',
          fontFamily: "'Playfair Display', serif",
          '&:hover': {
            backgroundColor: '#12E06D',
          },
        }}
        data-aos="fade-up"
      >
        Buy Now
      </Button>
    </Container>
  );
};

export default HowItWorksDesign;
