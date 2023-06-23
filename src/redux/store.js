import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./Slice/categoriesSlice";
import authSlice from "./Slice/authSlice";
import productsSlice from "./Slice/productsSlice";
import cartSlice from "./Slice/cartSlice";
import orderSlice from "./Slice/orderSlice";

const store = configureStore({
  reducer: {
    categories: categoriesSlice,
    auth: authSlice,
    products: productsSlice,
    cart: cartSlice,
    orders: orderSlice,
  },
});

export default store;
