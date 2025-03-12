import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Box, Card, Typography, Container, Grid } from '@mui/material';
import { ArrowUpRight } from 'lucide-react';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(4),
  height: '250px',
  '@media (max-width:600px)': {
    height: '280px',
  },
  minHeight: '200px',
  borderRadius: '24px',
  background: '#FFFFFF',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
  position: 'relative',
  transition: 'all 0.3s ease',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  overflow: 'visible',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
    borderRadius: '24px 24px 24px 90px',
    '& .arrow-button': {
      transform: 'translate(calc(-100% - 230px), calc(100% + 110px)) scale(2)',
      background: 'transparent',
      color: 'black',
      width: '48px',
      height: '48px',
      borderRadius: '50%',
    },
  },
}));

const ArrowButton = styled(Box)({
  position: 'absolute',
  top: '20px',
  right: '20px',
  width: '36px',
  height: '36px',
  borderRadius: '50%',
  background: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease-in-out',
  cursor: 'pointer',
  zIndex: 2,
  '&:hover': {
    background: '#000',
    color: '#fff',
  },
});

const SideArrow = styled('img')({
  position: 'absolute',
  width: '150px',
  height: 'auto',
  '@media (max-width:600px)': {
    width: '100px',
  },
});

const InfoSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <Box
      sx={{
        py: 8,
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(to bottom, #f8f9fa, #ffffff)',
      }}
    >
      <SideArrow
        src="https://i.postimg.cc/FRtkkdsz/image.png"
        alt="Left arrows"
        sx={{ left: -20 }}
        data-aos="fade-right"
      />

      <SideArrow
        src="https://i.postimg.cc/ZqzJrr3G/image.png"
        alt="Right arrows"
        sx={{ right: -20 }}
        data-aos="fade-left"
      />

      <Container maxWidth="lg">
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* First Card */}
          <Grid item xs={12} sm={6} md={4} data-aos="fade-up">
            <StyledCard>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', fontSize: { xs: '1.1rem', sm: '1.3rem' }, fontFamily: "'Playfair Display', serif" }}>
                How it works
              </Typography>
              <Typography variant="body1" style={{ fontFamily: '"Inter", sans-serif' }}>
                Purchase as many pixels as you need ($1 per pixel)
              </Typography>
              <ArrowButton className="arrow-button" component="a" href="/howitworks">
                <ArrowUpRight size={20} />
              </ArrowButton>
            </StyledCard>
          </Grid>

          {/* Second Card */}
          <Grid item xs={12} sm={6} md={4} data-aos="fade-up" data-aos-delay="200">
            <StyledCard>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', fontSize: { xs: '1.1rem', sm: '1.3rem' }, fontFamily: "'Playfair Display', serif" }}>
                What is the Event
              </Typography>
              <Typography variant="body1" style={{ fontFamily: '"Inter", sans-serif' }}>
                Our Tech Treasure Hunt is an innovative marketing campaign designed to combine social media
              </Typography>
              <ArrowButton className="arrow-button" component="a" href="/event">
                <ArrowUpRight size={20} />
              </ArrowButton>
            </StyledCard>
          </Grid>

          {/* Third Card */}
          <Grid item xs={12} sm={6} md={4} data-aos="fade-up" data-aos-delay="400">
            <StyledCard>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', fontSize: { xs: '1.1rem', sm: '1.3rem' }, fontFamily: "'Playfair Display', serif" }}>
                What we Offer
              </Typography>
              <Typography variant="body1" component="div" style={{ fontFamily: '"Inter", sans-serif' }}>
                • Pixel-based advertising: Ads will be displayed on a dynamic event website
                <br /><br />
                • Social sharing by participants: Participants must share ads with at least 100 people to qualify for rewards.
              </Typography>
              <ArrowButton className="arrow-button" component="a" href="/whatweoffer">
                <ArrowUpRight size={20} />
              </ArrowButton>
            </StyledCard>
          </Grid>
        </Grid>

        {/* Second Row */}
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={6} md={4} data-aos="fade-up">
            <StyledCard>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', fontSize: { xs: '1.1rem', sm: '1.3rem' }, fontFamily: "'Playfair Display', serif" }}>
                Benefit for your Brand
              </Typography>
              <Typography variant="body1" style={{ fontFamily: '"Inter", sans-serif' }}>
                Low Cost, High Impact: Only $1 per pixel—an affordable way to test a new marketing channel
              </Typography>
              <ArrowButton className="arrow-button" component="a" href="/benefit">
                <ArrowUpRight size={20} />
              </ArrowButton>
            </StyledCard>
          </Grid>

          <Grid item xs={12} sm={6} md={8} data-aos="zoom-in">
            <Box
              component="img"
              src="https://i.postimg.cc/Fsfv8Pxt/image.png"
              alt="Treasure map"
              sx={{
                width: '100%',
                maxWidth: '500px',
                height: '300px',
                borderRadius: '24px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                '@media (max-width:500px)': {
                  width: '100%',
                  height: 'auto',
                },
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default InfoSection;