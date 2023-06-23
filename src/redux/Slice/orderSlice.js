import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "orders",
  initialState: {
    userOrders: [],
    singleOrder : null,
    allOrders : null,
  },
  reducers: {
    setOrdersUser(state, action) {
      state.userOrders = action.payload;
    },
    setSingleOrder(state, action) {
      state.singleOrder = action.payload;
    },
    setAllOrders(state, action) {
      state.allOrders = action.payload;
    },
    setCancelOrder(state, action) {
      state.allOrders = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setOrdersUser, setSingleOrder, setAllOrders, setCancelOrder } = orderSlice.actions;

export default orderSlice.reducer;
