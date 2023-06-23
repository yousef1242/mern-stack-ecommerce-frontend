import { useDispatch } from "react-redux";
import "./AddCategoryAdminDashboard.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { setAddCategoryApiCall } from "../../redux/apiCall/categoriesApiCall";

const AddCategoryAdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [gender, setGender] = useState("");
  const [title, setTitle] = useState("");
  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!gender || !title) {
      toast.error("Please fill out all required fields.");
      return;
    }
    dispatch(
      setAddCategoryApiCall({
        title: title,
        gender: gender,
      })
    );
    navigate("/");
  };
  return (
    <>
      <div className="add-product-dashboard">
        <h1 className="fw-bold text-center" style={{ marginBottom: "100px" }}>
          Add category
        </h1>
        <div className="container">
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select id="gender" onChange={(e) => setGender(e.target.value)}>
                <option selected disabled>
                  Select gender
                </option>
                <option value="men">Men</option>
                <option value="women">Women</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="category">Category name</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Category name"
              />
            </div>
            <button type="submit" className="add-btn">
              Add category
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCategoryAdminDashboard;
