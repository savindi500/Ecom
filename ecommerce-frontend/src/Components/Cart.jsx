import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/actions';
import {
  Button,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Paper,
  IconButton,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const Cart = () => {
  // State to manage cart items
  const [cartItems, setCartItems] = useState([]);
  
  // Navigation and Redux dispatch hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetch cart items on component mount
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:5132/api/cart');
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
    fetchCartItems();
  }, []);

  // Update quantity of a specific cart item
  const updateCartItemQuantity = async (cartItemId, newQuantity) => {
    try {
      await axios.put(`http://localhost:5132/api/cart/update-quantity/${cartItemId}?newQuantity=${newQuantity}`);
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === cartItemId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (err) {
      console.error('Error updating quantity:', err);
    }
  };

  // Remove a specific item from the cart
  const handleDeleteItem = async (cartItemId) => {
    try {
      await axios.delete(`http://localhost:5132/api/cart/${cartItemId}`);
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== cartItemId));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  // Handle order placement and reset cart
  const handlePlaceOrder = async () => {
    try {
      await axios.post('http://localhost:5132/api/orders', { items: cartItems });
      setCartItems([]);
      dispatch(clearCart());
      navigate('/order-confirmation');
    } catch (error) {
      console.error('Error placing the order:', error);
    }
  };

  // Calculate total amount in the cart
  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Box sx={{ padding: '20px', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      {/* Title */}
      <Typography
        variant="h4"
        sx={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}
      >
        Order Summary
      </Typography>

      {/* Cart Content */}
      {cartItems.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: 'center' }}>
          Your cart is empty.
        </Typography>
      ) : (
        <Paper sx={{ padding: '20px', borderRadius: '8px', boxShadow: 2 }}>
          {/* Cart Items Table */}
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Product Name</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Qty</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Product Price</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Product Amount</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.productName}</TableCell>
                  <TableCell align="center">
                    {/* Quantity Management */}
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <IconButton
                        onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <RemoveCircleIcon />
                      </IconButton>
                      <Typography sx={{ marginX: 1 }}>{item.quantity}</Typography>
                      <IconButton onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}>
                        <AddCircleIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell align="center">${item.price.toFixed(2)}</TableCell>
                  <TableCell align="center">
                    ${(item.price * item.quantity).toFixed(2)}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDeleteItem(item.id)}
                      sx={{ fontWeight: 'bold', fontFamily: 'Poppins, sans-serif' }}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Total Amount Display */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '20px',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              backgroundColor: '#f7f7f7',
            }}
          >
            <Typography variant="h6" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold' }}>
              Total Amount:
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontWeight: 'bold', color: '#ff5722', fontFamily: 'Poppins, sans-serif' }}
            >
              ${totalAmount.toFixed(2)}
            </Typography>
          </Box>

          {/* Place Order Button */}
          <Box sx={{ textAlign: 'right', marginTop: '20px' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handlePlaceOrder}
              sx={{
                fontWeight: 'bold',
                fontFamily: 'Poppins, sans-serif',
                backgroundColor: '#0047AB',
                '&:hover': { backgroundColor: '#0096FF' },
              }}
            >
              Place Order
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default Cart;
