import axios from 'axios';

// Base URL for API requests
const BASE_URL = 'http://localhost:5132/api';

/**
 * Fetches all items in the cart.
 * @returns {Promise<Array>} - A promise that resolves to the list of cart items.
 */
export const fetchCartItems = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/cart`); // API call to fetch cart items
    return response.data; // Return the data from the response
  } catch (error) {
    console.error('Error fetching cart items:', error);
    throw error; // Re-throw the error for further handling
  }
};

/**
 * Removes an item from the cart by its ID.
 * @param {string | number} id - The unique identifier of the cart item to be removed.
 */
export const removeCartItem = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/cart/${id}`); // API call to delete a specific cart item
  } catch (error) {
    console.error(`Error removing cart item with ID ${id}:`, error);
    throw error; // Re-throw the error for further handling
  }
};

/**
 * Fetches the list of available products.
 * @returns {Promise<Array>} - A promise that resolves to the list of products.
 */
export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/products`); // API call to fetch product data
    return response.data; // Return the data from the response
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error; // Re-throw the error for further handling
  }
};
