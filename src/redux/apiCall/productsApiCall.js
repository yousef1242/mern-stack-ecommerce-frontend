import {
  setAllProducts,
  setShop,
  setSingleProduct,
} from "../Slice/productsSlice";
import request from "../request";
import { toast } from "react-toastify";

// get ll products
export function setAllProductsApiCall() {
  return async (dispatch) => {
    try {
      const { data } = await request.get("/api/products");
      dispatch(setAllProducts(data));
    } catch (error) {
      console.log(error);
    }
  };
}

// get all shop products
export function setShopApiCall(genderValue, categoryValue) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(
        `/api/products/shop${genderValue ? `?gender=${genderValue}` : ""}${
          categoryValue ? `&category=${categoryValue}` : ""
        }`
      );
      dispatch(setShop(data));
    } catch (error) {
      console.log(error);
    }
  };
}

// get single product
export function setSingleProductApiCall(productName) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/products/${productName}`);
      dispatch(setSingleProduct(data));
    } catch (error) {
      console.log(error);
    }
  };
}

// delete single product
export function setDeleteProductApiCall(productId) {
  return async (dispatch, getState) => {
    try {
      await request.delete(`/api/products/delete/${productId}`, {
        headers: {
          Authorization: "bearer " + getState().auth.user.token,
        },
      });
      toast.success("Product has been deleted");
    } catch (error) {
      console.log(error);
    }
  };
}

// add product
export function setAddProductApiCall(data) {
  return async (dispatch, getState) => {
    try {
      await request.post(`/api/products/add-product`, data, {
        headers: {
          Authorization: "bearer " + getState().auth.user.token,
        },
      });
      toast.success("Product has been created");
    } catch (error) {
      toast.error("File type is not supported");
      console.log(error);
    }
  };
}

// add product
export function seUpdateProductApiCall(newData, productName) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/products/update/${productName}`,
        newData,
        {
          headers: {
            Authorization: "bearer " + getState().auth.user.token,
          },
        }
      );
      toast.success(data.message);
    } catch (error) {
      console.log(error);
    }
  };
}
