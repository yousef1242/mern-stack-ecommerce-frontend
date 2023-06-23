import { createSlice } from "@reduxjs/toolkit";
import cookie from "js-cookie";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    setCartForUser(state, action) {
      state.cart = action.payload;
    },
    setAddToCartForUser(state, action) {
      state.cart.push(action.payload);
    },
    setDeleteProductCart(state, action) {
      return {
        ...state.cart,
        cart: state.cart.filter(item => item._id !== action.payload._id)
      };
    },
    setDeleteAllProductsCart(state, action) {
      state.cart = [];
    },
    setUpdateQuantaty(state, action) {
      const updatedCart = state.cart.map(item => {
        if (item._id === action.payload._id) {
          return {
            ...item,
            quantaty: action.payload.quantaty // assuming the payload contains the new quantity
          };
        }
        return item;
      });
    
      return {
        ...state,
        cart: updatedCart
      };
    }
  },
});

// Action creators are generated for each case reducer function
export const { setCartForUser, setAddToCartForUser, setDeleteProductCart, setDeleteAllProductsCart, setUpdateQuantaty } = cartSlice.actions;

export default cartSlice.reducer;
