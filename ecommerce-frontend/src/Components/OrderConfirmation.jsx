import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import orderConfirmationImage from '../assets/oderconfirm.png'; // Import the order confirmation image

const OrderConfirmation = () => {
  return (
    // Outer Box for full-page centering and styling
    <Box
      sx={{
        display: 'flex', // Center content horizontally
        justifyContent: 'center',
        alignItems: 'center', // Center content vertically
        minHeight: '100vh', // Full-page height
        backgroundColor: '#f9f9f9', // Light gray background
        padding: 2, // Padding for spacing
      }}
    >
      {/* Main Container for the confirmation card */}
      <Container
        sx={{
          backgroundColor: '#fff', // White background for the card
          borderRadius: '12px', // Rounded corners
          boxShadow: 3, // Subtle shadow for depth
          padding: 4, // Inner padding for content spacing
          maxWidth: { xs: '90%', sm: '400px', md: '450px' }, // Responsive width for different screen sizes
          textAlign: 'center', // Center text alignment
          overflow: 'hidden', // Prevent content overflow
          maxHeight: '90vh', // Limit height for small screens
        }}
      >
        {/* Confirmation Title */}
        <Typography
          variant="h4"
          sx={{
            fontFamily: 'Poppins, sans-serif', // Modern sans-serif font
            fontWeight: 'bold', // Bold for emphasis
            letterSpacing: '1.5px', // Slight letter spacing for style
            color: '#0047AB', // Blue color for standout title
            marginBottom: 3, // Space below the title
          }}
        >
          Thank you for your order!
        </Typography>

        {/* Confirmation Message */}
        <Typography
          variant="body1"
          sx={{
            fontFamily: 'Poppins, sans-serif', // Consistent font
            lineHeight: 1.8, // Increased line spacing for readability
            color: '#333', // Neutral text color
            marginBottom: 4, // Space below the message
          }}
        >
          Your order has been placed successfully. We’ll notify you once it’s on its way. We appreciate your trust and look forward to serving you again soon!
        </Typography>

        {/* Image Section */}
        <Box
          sx={{
            marginTop: 2, // Space above the image
            borderRadius: '12px', // Rounded corners for the image box
            overflow: 'hidden', // Prevent image overflow
          }}
        >
          <img
            src={orderConfirmationImage} // Display the imported image
            alt="Order Confirmation" // Descriptive alt text
            style={{
              width: '80%', // Set image width as 80% of the container
              borderRadius: '12px', // Match border radius with container
            }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default OrderConfirmation;
