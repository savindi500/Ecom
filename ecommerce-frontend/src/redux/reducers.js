import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [], // Array to hold cart items
    },
    reducers: {
      addToCart: (state, action) => {
        const existingItem = state.items.find(
          (item) => item.id === action.payload.id
        );
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          state.items.push({ ...action.payload, quantity: 1 });
        }
      },
      
      
      
        removeFromCart: (state, action) => {
            // Remove item based on its ID
            state.items = state.items.filter((item) => item.id !== action.payload);
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            if (quantity > 0) {
                const existingItem = state.items.find((item) => item.id === id);
                if (existingItem) {
                    // Update quantity only if item exists
                    existingItem.quantity = quantity;
                }
            }
        },
        clearCart: (state) => {
            // Empty the cart
            state.items = [];
        },
        setCartItems: (state, action) => {
          // Set items fetched from the backend
          state.items = action.payload;
        },
    },
});

export const cartReducer = cartSlice.reducer; // Export the reducer
export const cartActions = cartSlice.actions; // Export all actions
