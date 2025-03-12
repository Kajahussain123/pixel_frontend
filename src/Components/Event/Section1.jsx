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

const EventSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <RootContainer maxWidth="lg">
      {/* Left side arrow */}
      <SideArrow
        src="https://i.postimg.cc/FRtkkdsz/image.png"
        alt="Left arrows"
        style={{ left: 0 }}
        data-aos="fade-right"
      />
      
      {/* Right side arrow */}
      <SideArrow
        src="https://i.postimg.cc/ZqzJrr3G/image.png"
        alt="Right arrows"
        style={{ right: 0 }}
        data-aos="fade-left"
      />

      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <TextSection data-aos="fade-up">
            <Typography
              style={{ fontFamily: "'Playfair Display', serif" }}
              variant="h4"
              fontWeight="bold"
              gutterBottom
            >
              What is the event
            </Typography>
            <Typography variant="body1" style={{ fontFamily: '"Inter", sans-serif' }}>
              The Tech Treasure Hunt is an exciting and innovative marketing campaign designed to blend social media engagement with interactive fun. Brands can purchase ad pixels for just $1 each, showcasing their advertisements in a vibrant and engaging format. Users then take part by promoting these ads, joining a rewarding challenge that adds an element of thrill and competition. This approach sparks a viral ripple effect, creating buzz and maximizing exposure for your brand. It’s a simple yet powerful way to connect with audiences, drive engagement, and make your marketing efforts stand out. Join the hunt and watch your brand’s reach soar! <br /><br />
              The Tech Treasure Hunt combines social media engagement with fun to give your brand maximum exposure. Companies buy pixels for just $1 each, where their ads or logos are displayed on our interactive website. Participants discover these ads, share them on social media, and unlock rewards, creating a viral ripple effect that drives organic reach. <br /><br />
              Here’s how it works: Companies purchase pixels, submit their ads, and get featured on the event website. Participants select a pixel, view the ad, and share it with their network to access rewards. Each pixel guarantees at least 101 views, driving traffic to your website and building trust through authentic engagement. <br /><br />
              This campaign is affordable and impactful, offering massive reach at a fraction of traditional marketing costs. By joining, your brand is positioned as innovative, creative, and part of an exciting journey that people love to share. For just $1 per pixel, stand out, go viral, and connect with your audience in a meaningful way! <br /><br />
            </Typography>
          </TextSection>
        </Grid>
      </Grid>
    </RootContainer>
  );
};

export default EventSection;
