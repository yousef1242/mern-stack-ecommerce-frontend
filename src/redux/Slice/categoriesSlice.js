import { createSlice } from "@reduxjs/toolkit";

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    menCategories: [],
    womenCategories: [],
    allCategories: null,
  },
  reducers: {
    setAllCategories(state, action) {
      state.allCategories = action.payload;
    },
    setDeleteCategory(state, action) {
      state.allCategories = state.allCategories.filter(
        (cat) => cat._id !== action.payload._id
      );
    },
    setAddCategory(state, action) {
      state.allCategories.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setMenCategories,
  setWomenCategories,
  setAllCategories,
  setDeleteCategory,
  setAddCategory,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
