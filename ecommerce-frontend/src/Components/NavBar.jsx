import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const NavBar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#2C3E50',
        color: '#ECF0F1',
        boxShadow: 'none',
        borderBottom: '2px solid #3498DB',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            color: '#3498DB',
            cursor: 'pointer',
            '&:hover': {
              color: '#2980B9',
            },
          }}
          onClick={() => navigate('/')}
        >
          ECOM
        </Typography>

        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            gap: 2,
          }}
        >
          <Button
            color="inherit"
            sx={{
              color: '#ECF0F1',
              '&:hover': {
                color: '#2980B9',
              },
            }}
            onClick={() => navigate('/')}
          >
            HOME
          </Button>
          <Button
            color="inherit"
            sx={{
              color: '#ECF0F1',
              '&:hover': {
                color: '#2980B9',
              },
            }}
            onClick={() => navigate('/contact')}
          >
            CONTACT
          </Button>
          <Button
            color="inherit"
            sx={{
              color: '#ECF0F1',
              '&:hover': {
                color: '#2980B9',
              },
            }}
            onClick={() => navigate('/about')}
          >
            ABOUT
          </Button>
          <Button
            color="inherit"
            sx={{
              color: '#ECF0F1',
              '&:hover': {
                color: '#2980B9',
              },
            }}
            onClick={() => navigate('/faq')}
          >
            FAQ
          </Button>
          <Button
            color="inherit"
            sx={{
              color: '#ECF0F1',
              '&:hover': {
                color: '#2980B9',
              },
            }}
            onClick={() => navigate('/delivery')}
          >
            DELIVERY
          </Button>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color="inherit" onClick={() => navigate('/cart')}>
            <ShoppingCartIcon sx={{ color: '#3498DB', '&:hover': { color: '#2980B9' } }} />
          </IconButton>
          <IconButton
            color="inherit"
            sx={{ display: { xs: 'flex', md: 'none' }, ml: 2 }}
            onClick={handleMenuToggle}
          >
            <MenuIcon sx={{ color: '#3498DB' }} />
          </IconButton>
        </Box>
      </Toolbar>

      {menuOpen && (
        <Box
          sx={{
            display: { xs: 'flex', md: 'none' },
            flexDirection: 'column',
            backgroundColor: '#2C3E50',
            padding: 2,
          }}
        >
          <Button
            color="inherit"
            sx={{
              color: '#ECF0F1',
              '&:hover': {
                color: '#2980B9',
              },
            }}
            onClick={() => {
              navigate('/');
              setMenuOpen(false);
            }}
          >
            HOME
          </Button>
          <Button
            color="inherit"
            sx={{
              color: '#ECF0F1',
              '&:hover': {
                color: '#2980B9',
              },
            }}
            onClick={() => {
              navigate('/contact');
              setMenuOpen(false);
            }}
          >
            CONTACT
          </Button>
          <Button
            color="inherit"
            sx={{
              color: '#ECF0F1',
              '&:hover': {
                color: '#2980B9',
              },
            }}
            onClick={() => {
              navigate('/about');
              setMenuOpen(false);
            }}
          >
            ABOUT
          </Button>
          <Button
            color="inherit"
            sx={{
              color: '#ECF0F1',
              '&:hover': {
                color: '#2980B9',
              },
            }}
            onClick={() => {
              navigate('/faq');
              setMenuOpen(false);
            }}
          >
            FAQ
          </Button>
          <Button
            color="inherit"
            sx={{
              color: '#ECF0F1',
              '&:hover': {
                color: '#2980B9',
              },
            }}
            onClick={() => {
              navigate('/delivery');
              setMenuOpen(false);
            }}
          >
            DELIVERY
          </Button>
        </Box>
      )}
    </AppBar>
  );
};

export default NavBar;