import { setCartForUser, setUpdateQuantaty } from "../Slice/cartSlice";
import request from "../request";
import { toast } from "react-toastify";

// add to cart
export function setAddToCartApiCall(cartData) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post("/api/cart/add-cart", cartData, {
        headers: {
          Authorization: "bearer " + getState().auth.user.token,
        },
      });
      toast.success(data.message);
    } catch (error) {
      console.log(error);
    }
  };
}

// find cart for user
export function setCartForUserApiCall() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get("/api/cart", {
        headers: {
          Authorization: "bearer " + getState().auth.user.token,
        },
      });
      dispatch(setCartForUser(data));
    } catch (error) {
      console.log(error);
    }
  };
}

// delete product from cart
export function setDeleteProductCartApiCall(cartId) {
  return async (dispatch, getState) => {
    try {
      await request.delete(`/api/cart/delete/${cartId}`, {
        headers: {
          Authorization: "bearer " + getState().auth.user.token,
        },
      });
      toast.success("Product has been deleted from your cart");
    } catch (error) {
      console.log(error);
    }
  };
}

// delete all products from cart
export function setDeleteAllProductsCartApiCall(cartId) {
  return async (dispatch, getState) => {
    try {
      await request.delete(`/api/cart/delete-all-cart`, {
        headers: {
          Authorization: "bearer " + getState().auth.user.token,
        },
      });
      toast.success("Your Cart has been deleted");
    } catch (error) {
      console.log(error);
    }
  };
}

// delete all products from cart
export function setUpdateCartApiCall(cartId,newData) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(`/api/cart/update/${cartId}`, newData,{
        headers: {
          Authorization: "bearer " + getState().auth.user.token,
        },
      });
      dispatch(setUpdateQuantaty(data));
      toast.success("Item has been updated");
    } catch (error) {
      console.log(error);
    }
  };
}
