import { createSlice } from "@reduxjs/toolkit";

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    menCategories: [],
    womenCategories: [],
    allCategories: null,
  },
  reducers: {
    setMenCategories(state, action) {
      state.menCategories = action.payload;
    },
    setWomenCategories(state, action) {
      state.womenCategories = action.payload;
    },
    setAllCategories(state, action) {
      state.allCategories = action.payload;
    },
    setDeleteCategory(state, action) {
      state.allCategories = state.allCategories.filter(
        (cat) => cat._id !== action.payload._id
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setMenCategories,
  setWomenCategories,
  setAllCategories,
  setDeleteCategory,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
