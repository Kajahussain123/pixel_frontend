import React, { useEffect } from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import AOS from 'aos';
import 'aos/dist/aos.css';

const RootContainer = styled(Container)({
  padding: '40px 20px',
  position: 'relative',
});

const TextSection = styled(Box)({
  textAlign: 'left',
});

const ImageSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  alignItems: 'center',
  position: 'relative',

  [theme.breakpoints.down('md')]: {
    marginLeft: '-108px',
  },
}));

const Image = styled('img')({
  width: '250px',
  height: '250px',
  borderRadius: '10px',
  objectFit: 'cover',
});

const SecondImageContainer = styled(Box)({
  position: 'relative',
  left: '100px',
});

const SideArrow = styled('img')({
  position: 'absolute',
  width: '150px',
  height: 'auto',
});

const BenefitSection = () => {
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

      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6} data-aos="fade-up">
          <TextSection>
            <Typography
              variant="h4"
              fontWeight="bold"
              gutterBottom
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Benefit for your brand
            </Typography>
            <Typography variant="body1" style={{ fontFamily: '"Inter", sans-serif' }}>
              Low Cost, High Impact is a groundbreaking concept that redefines marketing affordability with a pay-per-pixel advertising model at just $1 per pixel. This innovative approach allows businesses to test a new marketing channel with minimal investment while maximizing visibility and engagement.
              <br /><br />
              For just $1 per pixel, your brand gains incredible visibility through a cost-effective platform. Participants actively share your ad with their friends and followers, creating genuine peer-to-peer connections that build trust and credibility.
              <br /><br />
              The simplicity and flexibility of this model open doors to creative executions, making your brand feel authentic and personal—unlike traditional ads. By eliminating high service fees and middlemen, you save money while reaching a highly engaged audience.
              <br /><br />
              Participants are motivated to share your ad to unlock exciting rewards, driving even greater interest and engagement. Whether you're looking to boost awareness, build trust, or create buzz, this unique model delivers big results at a fraction of the cost.
            </Typography>
          </TextSection>
        </Grid>

        <Grid item xs={12} md={6} data-aos="zoom-in">
          <ImageSection>
            <Image
              src="https://i.postimg.cc/tTg0Y6zG/e076fe5b28a48ae398a04fd3c3df697c.jpg"
              alt="Marketing concept"
              data-aos="fade-up"
            />
            <SecondImageContainer>
              <Image
                src="https://i.postimg.cc/fy612rQM/fb4593d7b3fa0c6bf76d5b226315a2ed.jpg"
                alt="Marketing concept 2"
                data-aos="fade-up"
                data-aos-delay="200"
              />
            </SecondImageContainer>
          </ImageSection>
        </Grid>
      </Grid>
    </RootContainer>
  );
};

export default BenefitSection;
