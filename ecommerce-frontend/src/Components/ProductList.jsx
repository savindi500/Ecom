import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../redux/actions';
import heroImage from '../assets/laptop.jpg'; 
import defaultProductImage from '../assets/all.jpg'; 

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Button,
  Grid,
  Container,
  Card,
  CardContent,
  CardActions,
  Snackbar,
  Alert,
} from '@mui/material';


const ProductList = () => {
  // State to store the list of available products
  const [availableProducts, setAvailableProducts] = useState([]);
  
  // State to manage Snackbar notifications
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Redux dispatch function to trigger actions
  const dispatch = useDispatch();

  // React Router navigate function for programmatic navigation
  const navigate = useNavigate();

  // Fetch products from the API when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5132/api/products');
        setAvailableProducts(response.data); // Store fetched products in state
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Handler for adding a product to the cart
  const handleAddToCart = async (product) => {
    try {
      await axios.post('http://localhost:5132/api/cart', {
        productId: product.id,
        productName: product.name,
        quantity: 1,
      });
      dispatch(addToCart(product)); // Update Redux store with the new cart item
      setSnackbar({
        open: true,
        message: `${product.name} added to cart successfully!`,
        severity: 'success',
      });
    } catch (error) {
      console.error('Error adding to cart:', error.response?.data || error.message);
      setSnackbar({
        open: true,
        message: 'Failed to add the item to the cart. Item is not available.',
        severity: 'error',
      });
    }
  };

  // Close the Snackbar notification
  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Box
      sx={{
        // Styling for the overall component container
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        minHeight: '100vh',
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '50vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#fff',
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
          Welcome to Our Store
        </Typography>
      </Box>

      {/* Product List Section */}
      <Container maxWidth="lg" sx={{ paddingTop: 2, paddingBottom: 2 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 'bold', marginBottom: 3, textAlign: 'center', fontFamily: 'Poppins, sans-serif' }}
        >
          Featured Products
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {availableProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card
                sx={{
                  // Card styling with hover effect
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                  borderRadius: 2,
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'scale(1.05)' },
                }}
              >
                {/* Product Image Section */}
                <Box
                  sx={{
                    height: 150,
                    backgroundImage: `url(${defaultProductImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                {/* Product Details Section */}
                <CardContent
                  sx={{
                    textAlign: 'center',
                    padding: 2,
                    backgroundColor: '#fff',
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 'bold',
                      fontFamily: 'Poppins, sans-serif',
                      marginBottom: 1,
                    }}
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 'bold',
                      fontSize: '1rem',
                      color: '#4caf50',
                    }}
                  >
                    ${product.price}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#757575',
                      marginBottom: 2,
                    }}
                  >
                    {product.quantityInStock} in stock
                  </Typography>
                </CardContent>
                {/* Add to Cart Button */}
                <CardActions sx={{ justifyContent: 'center', paddingBottom: 2 }}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#0047AB',
                      color: '#fff',
                      fontWeight: 'bold',
                      fontFamily: 'Poppins, sans-serif',
                      '&:hover': {
                        backgroundColor: '#0096FF',
                      },
                    }}
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Snackbar Notification */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductList;
