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

const TermsAndConditions = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div>
        <Header></Header>
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
                  Terms and Conditions
                </Typography>
                <Typography variant="body1" style={{ fontFamily: '"Inter", sans-serif' }}>
                  <strong>1. Pixel Pricing and Refund Policy</strong><br/>
                  Each pixel is priced at $1 USD, with the price fixed and non-negotiable.<br/>
                  Refunds are not allowed once a purchase has been completed.<br/><br/>
                  
                  <strong>2. Content Guidelines for Advertisers</strong><br/>
                  All advertisements submitted for pixel spaces must be lawful, ethical, and non-offensive.<br/>
                  Avoid misleading or deceptive claims.<br/>
                  Exclude prohibited products, including alcohol, tobacco, gambling, or adult content.<br/>
                  Advertisers are fully responsible for the content they submit.<br/>
                  Acceptable file formats include JPG, PNG (for images), and MP4 (for videos).<br/>
                  Videos must not exceed 30 seconds in length.<br/><br/>
                  
                  <strong>3. Ad Submission and Modification</strong><br/>
                  Submitted ads cannot be modified by advertisers or our platform after submission.<br/><br/>
                  
                  <strong>4. Ad Placement and Visibility</strong><br/>
                  Ads will remain visible on the website until the event concludes.<br/>
                  Placement of ads is randomized and not subject to selection by advertisers.<br/>
                  Each pixel guarantees a minimum of 101 views.<br/> <br />
                  
                  <strong>5. Verification and Approval Process</strong><br/>
                  Submitted ads may go through a verification process to ensure compliance with our content guidelines.<br/>
                  We reserve the right to reject any ad that violates these guidelines.<br/><br/>
                  
                  <strong>6. Event Timeline and Stages</strong><br/>
                  The event will be executed in stages:<br/>
                  - Stage 1: 5,000 pixels<br/>
                  - Stage 2: 10,000 pixels<br/>
                  - Stage 3: 20,000 pixels<br/>
                  - Stage 4: 35,000 pixels<br/>
                  - Stage 5: 70,000 pixels<br/>
                  - Stage 6: 130,000 pixels<br/>
                  - Stage 7: 250,000 pixels<br/>
                  - Stage 8: 480,000 pixels<br/>
                  The event will officially begin once a minimum of 5,000 pixels are sold.<br/><br/>
                  
                  <strong>7. Liability and Legal Responsibility</strong><br/>
                  Advertisers are fully liable for the content they submit and any legal claims arising from it.<br/>
                  Our platform is not responsible for any legal disputes.<br/><br/>
                  
                  <strong>8. Ad Updates or Replacement</strong><br/>
                  Advertisements cannot be updated or replaced after submission.<br/><br/>
                  
                  <strong>9. Privacy and Data Handling</strong><br/>
                  We collect advertiser data solely for managing the campaign.<br/>
                  We will not share your data with any third parties.<br/><br/>
                  
                  <strong>10. Payment Methods and Charges</strong><br/>
                  Accepted payment methods: Credit Cards, PayPal, and UPI.<br/>
                  No additional charges, taxes, or transaction fees.<br/><br/>
                  
                  <strong>11. Termination Clause</strong><br/>
                  Advertisements violating our content guidelines will be removed without a refund.<br/><br/>
                  
                  <strong>12. Right to Modify Terms</strong><br/>
                  We reserve the right to update these terms at any time without prior notice.<br/><br/>
                  
                  By purchasing pixels, you agree to these terms. For questions, contact us at +919400544260.
                </Typography>
              </TextSection>
            </Grid>
          </Grid>
        </RootContainer>
        <Footer></Footer>
    </div>
  );
};

export default TermsAndConditions;
