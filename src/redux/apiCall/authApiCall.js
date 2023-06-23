import {
  setAllUsers,
  setAuthAction,
  setRegisterErrorMessage,
  setSingleUser,
  setUpdateUserInfo,
  setUser,
  setUserInfo,
  setUserWishlist,
} from "../Slice/authSlice";
import request from "../request";
import cookie from "js-cookie";
import { toast } from "react-toastify";

// REGISTER API CALL
export function setRegisterApiCall(dataForm) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/auth/register", dataForm);
      toast.success(data.message);
      dispatch(setRegisterErrorMessage(null));
    } catch (error) {
      dispatch(setRegisterErrorMessage(error.response.data.message));
      toast.error(error.response.data.message);
    }
  };
}

// LOGIN API CALL
export function setLoginApiCall(dataForm) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/auth/login", dataForm);
      dispatch(setUser(data));
      cookie.set("userInfoDetailsAfterLoginPage", JSON.stringify(data));
      console.log(data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// get single user for wishlist
export function setUserInfoApiCall(userId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(
        `/api/users/profile/wishlist/${userId}`,
        {
          headers: {
            Authorization: "bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(setUserInfo(data));
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };
}

// add product to wishlist
export function setWishlistForUserApiCall(productId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(`/api/users/wishlist`, productId, {
        headers: {
          Authorization: "bearer " + getState().auth.user.token,
        },
      });
      dispatch(setUserWishlist(data));
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };
}

// get single user
export function setSingleUserApiCall(userName) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`/api/users/profile/${userName}`, {
        headers: {
          Authorization: "bearer " + getState().auth.user.token,
        },
      });
      dispatch(setSingleUser(data));
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };
}

// logout
export function setLogoutUser() {
  return async (dispatch, getState) => {
    try {
      dispatch(setUser(null));
      dispatch(setSingleUser(null))
      cookie.remove("userInfoDetailsAfterLoginPage");
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };
}

// update user info
export function setUpdateUserInfoApiCall(userId, newData) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/users/profile/update/${userId}`,
        newData,
        {
          headers: {
            Authorization: "bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(setUpdateUserInfo(data));
      dispatch(setAuthAction(data.username))
      const user = JSON.parse(cookie.get("userInfoDetailsAfterLoginPage"));
      user.username = data?.username;
      cookie.set("userInfoDetailsAfterLoginPage", JSON.stringify(user));
      toast.success("Your profile has been updated");
    } catch (error) {
      if (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
    }
  };
}

// get all uses
export function setAllUsersApiCall() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(
        `/api/users`,
        {
          headers: {
            Authorization: "bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(setAllUsers(data))
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };
}
