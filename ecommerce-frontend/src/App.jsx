import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cart from './Components/Cart';
import ProductList from './Components/ProductList';
import OrderConfirmation from './Components/OrderConfirmation';
import Navbar from './Components/NavBar';
import Footer from './Components/Footer';

/**
 * Main Application Component
 * Sets up the router and defines routes for different pages of the application.
 */
const App = () => {
  return (
    <Router>
      <div>
        {/* Define application routes */}
        <Routes>
          {/* Home route displaying the product list */}
          <Route path="/" element={<WithNavbar><ProductList /></WithNavbar>} />

          {/* Route for the cart page */}
          <Route path="/cart" element={<WithNavbar><Cart /></WithNavbar>} />

          {/* Route for the order confirmation page */}
          <Route path="/order-confirmation" element={<WithNavbar><OrderConfirmation /></WithNavbar>} />
        </Routes>
      </div>
    </Router>
  );
};

/**
 * Higher-Order Component to wrap child components with a Navbar and Footer.
 * Ensures consistent layout across all pages.
 * 
 * @param {React.ReactNode} children - The content to be rendered between the Navbar and Footer.
 */
const WithNavbar = ({ children }) => (
  <>
    {/* Navbar displayed at the top of the page */}
    <Navbar />

    {/* Main content area */}
    <main>{children}</main>

    {/* Footer displayed at the bottom of the page */}
    <Footer />
  </>
);

export default App;
