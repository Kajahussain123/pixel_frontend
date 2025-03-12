import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Container, Grid, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const RootContainer = styled(Container)({
  padding: '40px 20px',
  position: 'relative',
});

const TextSection = styled(Box)({
  textAlign: 'left',
  maxWidth: '900px',
  margin: '0 auto',
});

const PrivacyPolicy = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div>
      <Header />
      <RootContainer maxWidth="lg">
        <Grid container justifyContent="center">
          <Grid item xs={12}>
            <TextSection data-aos="fade-up">
              <Typography
                style={{ fontFamily: "'Playfair Display', serif" }}
                variant="h4"
                fontWeight="bold"
                gutterBottom
              >
                Privacy Policy
              </Typography>
              <Typography variant="body1" style={{ fontFamily: '"Inter", sans-serif' }}>
                Welcome to PlantMyAd! We value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you use our platform.
                <br /><br />
                <strong>1. Information We Collect</strong>
                <br />
                <strong>Personal Information:</strong> When you purchase advertising pixels or interact with our platform, we may collect your name, email address, payment details, and contact information.
                <br />
                <strong>Non-Personal Information:</strong> We may collect data such as browser type, IP address, and usage patterns to improve our services.
                <br /><br />
                <strong>2. How We Use Your Information</strong>
                <br />
                - To process purchases and transactions.
                <br />
                - To communicate with you regarding your ads and services.
                <br />
                - To enhance user experience and improve our platform.
                <br />
                - To comply with legal requirements.
                <br /><br />
                <strong>3. Data Security</strong>
                <br />
                We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
                <br /><br />
                <strong>4. Third-Party Sharing</strong>
                <br />
                We do not sell, trade, or share your personal information with third parties, except when required by law or necessary for payment processing.
                <br /><br />
                <strong>5. Cookies and Tracking</strong>
                <br />
                We may use cookies to personalize content, analyze site traffic, and improve our services. You can adjust your browser settings to disable cookies if preferred.
                <br /><br />
                <strong>6. User Rights</strong>
                <br />
                You have the right to:
                <br />
                - Access, modify, or delete your personal data.
                <br />
                - Opt out of marketing communications.
                <br />
                - Request a copy of your stored information.
                <br /><br />
                <strong>7. Updates to Privacy Policy</strong>
                <br />
                We may update this policy from time to time. Any changes will be posted on this page, and continued use of our platform implies acceptance of the updated policy.
                <br /><br />
                <strong>8. Contact Information</strong>
                <br />
                For any questions or concerns regarding this Privacy Policy, please contact us at +919400544260.
              </Typography>
            </TextSection>
          </Grid>
        </Grid>
      </RootContainer>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
