import { createSlice } from "@reduxjs/toolkit";
import cookie from "js-cookie";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: cookie.get("userInfoDetailsAfterLoginPage")
      ? JSON.parse(cookie.get("userInfoDetailsAfterLoginPage"))
      : null,
    registerErrorMessage: null,
    userInfo: null,
    singleUser: null,
    allUsers : null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setRegisterErrorMessage(state, action) {
      state.registerErrorMessage = action.payload;
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    setUserWishlist(state, action) {
      state.userInfo.wishlist = action.payload.wishlist;
    },
    setSingleUser(state, action) {
      state.singleUser = action.payload;
    },
    setFilterWishlist(state, action) {
      state.singleUser.wishlist = state.singleUser.wishlist.filter(
        (item) => item._id !== action.payload._id
      );
    },
    setUpdateUserInfo(state, action) {
      state.singleUser = action.payload;
    },
    setAuthAction(state,action){
      state.user.username = action.payload
    },
    setAllUsers(state,action){
      state.allUsers = action.payload
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setUser,
  setRegisterErrorMessage,
  setUserInfo,
  setUserWishlist,
  setSingleUser,
  setFilterWishlist,
  setUpdateUserInfo,
  setAuthAction,
  setAllUsers,
} = authSlice.actions;

export default authSlice.reducer;
