import {
  setAllOrders,
  setCancelOrder,
  setOrdersUser,
  setSingleOrder,
} from "../Slice/orderSlice";
import request from "../request";
import { toast } from "react-toastify";

// add new order
export function setAddNewOrderApiCall(orderData) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post("/api/orders/new-order", orderData, {
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

// get orders user
export function setOrdersUserApiCall(userId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`/api/orders/${userId}`, {
        headers: {
          Authorization: "bearer " + getState().auth.user.token,
        },
      });
      dispatch(setOrdersUser(data));
    } catch (error) {
      console.log(error);
    }
  };
}

// get orders user
export function setAllOrdersApiCall(userId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`/api/orders`, {
        headers: {
          Authorization: "bearer " + getState().auth.user.token,
        },
      });
      dispatch(setAllOrders(data));
    } catch (error) {
      console.log(error);
    }
  };
}

// get single order
export function setSingleOrderApiCall(orderId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`/api/orders/single/${orderId}`);
      dispatch(setSingleOrder(data));
    } catch (error) {
      console.log(error);
    }
  };
}

// cancel order
export function setCancelOrderApiCall(orderId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(`/api/orders/cancel/${orderId}`, {},{
        headers: {
          Authorization: "bearer " + getState().auth.user.token,
        },
      });
      dispatch(setCancelOrder(data));
      toast.success("Order has been canceled");
    } catch (error) {
      console.log(error);
    }
  };
}
