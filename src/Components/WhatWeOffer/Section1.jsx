import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Container, Grid, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

const RootContainer = styled(Container)({
  padding: '40px 20px',
  position: 'relative',
});

const TextSection = styled(Box)({
  textAlign: 'left',
  maxWidth: '900px',
  margin: '0 auto',
});

const SideArrow = styled('img')({
  position: 'absolute',
  width: '150px',
  height: 'auto',
});

const WhatWeOfferSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // Initialize AOS with a 1-second animation duration
  }, []);

  return (
    <RootContainer maxWidth="lg">
      {/* Left side arrow with fade-right animation */}
      <SideArrow
        src="https://i.postimg.cc/FRtkkdsz/image.png"
        alt="Left arrows"
        style={{ left: 0 }}
        data-aos="fade-right"
      />

      {/* Right side arrow with fade-left animation */}
      <SideArrow
        src="https://i.postimg.cc/ZqzJrr3G/image.png"
        alt="Right arrows"
        style={{ right: 0 }}
        data-aos="fade-left"
      />

      <Grid container justifyContent="center">
        <Grid item xs={12}>
          {/* Text section fades in from bottom */}
          <TextSection data-aos="fade-up">
            <Typography
              variant="h4"
              fontWeight="bold"
              gutterBottom
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              What We Offer?
            </Typography>
            <Typography variant="body1" style={{ fontFamily: '"Inter", sans-serif' }}>
              In today’s digital world, visibility is everything—but engagement is what truly sets a brand apart. Our dynamic event platform ensures that your brand doesn’t just get seen but becomes an integral part of an immersive experience. Participants are actively involved in sharing content, meaning your ads won’t just be another impression; they’ll spark conversations, create excitement, and drive real engagement.
              <br /><br />
              What makes this opportunity unique? Social sharing is built into the event’s core. Participants are incentivized to share your ad with at least 100 people to qualify for rewards, guaranteeing organic exposure to a highly engaged audience. Unlike traditional advertising, where messages are easily ignored, this approach encourages personal recommendations, which significantly boosts trust and brand recall.
              <br /><br />
              Being part of this innovative event also positions your brand as modern, forward-thinking, and interactive. By integrating with a cutting-edge platform, you show customers that you embrace new, creative ways to connect with them. This isn’t just about impressions; it’s about making a lasting impact that sets you apart from competitors.
              <br /><br />
            </Typography>
          </TextSection>
        </Grid>
      </Grid>
    </RootContainer>
  );
};

export default WhatWeOfferSection;
