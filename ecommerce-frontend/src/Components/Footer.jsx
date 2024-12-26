import React from 'react';
import { Box, Typography, Grid, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#2C3E50',
        color: '#ECF0F1',
        padding: 4,
        mt: 'auto',
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      <Grid container spacing={4} justifyContent="center">
        {/* About Section */}
        <Grid item xs={12} sm={4} textAlign="center">
          <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1, color: '#FFD700' }}>
            About ECOM
          </Typography>
          <Typography variant="body2">
            Your one-stop shop for the best products. We aim to provide a seamless and enjoyable shopping experience for all our customers.
          </Typography>
        </Grid>

        {/* Quick Links Section */}
        <Grid item xs={12} sm={4} textAlign="center">
          <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1, color: '#FFD700' }}>
            Quick Links
          </Typography>
          <Typography variant="body2">Home</Typography>
          <Typography variant="body2">Contact Us</Typography>
          <Typography variant="body2">About Us</Typography>
          <Typography variant="body2">FAQs</Typography>
          </Grid>

        {/* Social Media Section */}
        <Grid item xs={12} sm={4} textAlign="center">
          <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1, color: '#FFD700' }}>
            Follow Us
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <IconButton href="https://facebook.com" target="_blank" sx={{ color: '#3498DB' }}>
              <FacebookIcon />
            </IconButton>
            <IconButton href="https://twitter.com" target="_blank" sx={{ color: '#3498DB' }}>
              <TwitterIcon />
            </IconButton>
            <IconButton href="https://instagram.com" target="_blank" sx={{ color: '#3498DB' }}>
              <InstagramIcon />
            </IconButton>
            <IconButton href="https://linkedin.com" target="_blank" sx={{ color: '#3498DB' }}>
              <LinkedInIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ textAlign: 'center', marginTop: 3 }}>
        <Typography variant="body2" sx={{ color: '#FFD700' }}>
          © {new Date().getFullYear()} ECOM. All rights reserved.
        </Typography>
        <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
          Designed for a seamless shopping experience.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
