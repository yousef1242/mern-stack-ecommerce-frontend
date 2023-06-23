import {
  setAllCategories,
  setMenCategories,
  setWomenCategories,
} from "../Slice/categoriesSlice";
import request from "../request";
import { toast } from "react-toastify";

// get men categories
export function setMenCategoriesApiCall() {
  return async (dispatch) => {
    try {
      const { data } = await request.get("/api/categories/men");
      dispatch(setMenCategories(data));
    } catch (error) {
      console.log(error);
    }
  };
}

// get women categories
export function setWomenCategoriesApiCall() {
  return async (dispatch) => {
    try {
      const { data } = await request.get("/api/categories/women");
      dispatch(setWomenCategories(data));
    } catch (error) {
      console.log(error);
    }
  };
}

// get all categories
export function setAllCategoriesApiCall() {
  return async (dispatch) => {
    try {
      const { data } = await request.get("/api/categories");
      dispatch(setAllCategories(data));
    } catch (error) {
      console.log(error);
    }
  };
}

// get all categories
export function setDeleteCategoryApiCall(catId) {
  return async (dispatch,getState) => {
    try {
      await request.delete(`/api/categories/delete/${catId}`, {
        headers: {
          Authorization: "bearer " + getState().auth.user.token,
        },
      });
      toast.success("Category has been deleted");
    } catch (error) {
      console.log(error);
    }
  };
}

// add category
export function setAddCategoryApiCall(catData) {
  return async (dispatch,getState) => {
    try {
      await request.post(`/api/categories/add-category`, catData,{
        headers: {
          Authorization: "bearer " + getState().auth.user.token,
        },
      });
      toast.success("Category has been added");
    } catch (error) {
      console.log(error);
    }
  };
}
