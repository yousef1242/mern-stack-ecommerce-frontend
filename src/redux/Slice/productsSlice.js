import { createSlice } from '@reduxjs/toolkit'

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products : [],
    shopProducts : [],
    singleProduct : {},
    allProducts : null,
  },
  reducers: {
    setAllProducts(state,action){
        state.products = action.payload;
    },
    setShop(state,action){
        state.shopProducts = action.payload;
    },
    setSingleProduct(state,action){
        state.singleProduct = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setAllProducts, setShop, setSingleProduct } = productsSlice.actions;

export default productsSlice.reducer