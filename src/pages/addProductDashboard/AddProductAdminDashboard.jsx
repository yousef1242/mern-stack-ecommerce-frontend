import { useEffect, useState } from "react";
import {
  setAllCategoriesApiCall,
  setMenCategoriesApiCall,
  setWomenCategoriesApiCall,
} from "../../redux/apiCall/categoriesApiCall";
import "./addProductAdminDashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setAddProductApiCall } from "../../redux/apiCall/productsApiCall";
import { useNavigate } from "react-router-dom";

const AddProductAdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allCategories } = useSelector((state) => state.categories);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [discount, setDiscount] = useState();
  const [gender, setGender] = useState("");
  const [category, setCategory] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [imageLinkarray, setImageLinkArray] = useState([]);
  const [ImageFileArray, setImageFileArray] = useState([]);
  const addImageLink = (e) => {
    if (!imageLink) {
      toast.error("Image link is required");
    } else {
      const file = imageLink;
      setImageLinkArray((prevArray) => [...prevArray, file]);
      setImageLink("");
    }
  };
  const addImageFile = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setImageFileArray((prevArray) => [...prevArray, file]);
    }
  };
  const deleteImageLink = (index) => {
    setImageLinkArray(imageLinkarray.filter((_, i) => i !== index));
  };
  const deleteImageFile = (index) => {
    setImageFileArray(ImageFileArray.filter((_, i) => i !== index));
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
    dispatch(setAllCategoriesApiCall());
  }, []);
  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!name || !description || !price || !gender || !category) {
      toast.error("Please fill out all required fields.");
      return;
    }
    if (price <= 0) {
      toast.error("Price must be greater than zero.");
      return;
    }
    if (discount < 0 || discount >= 100) {
      toast.error("Discount must be between 0 and 99.");
      return;
    }
    if (!ImageFileArray.length > 0 && !imageLinkarray.length > 0) {
      toast.error("Please choose images");
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("disCountPrecent", discount);
    formData.append("gender", gender);
    formData.append("category", category);
    formData.append("files", ImageFileArray);
    for (let i = 0; i < ImageFileArray.length; i++) {
      formData.append("files", ImageFileArray[i]);
    }
    for (let index = 0; index < imageLinkarray.length; index++) {
      formData.append("imageUrls", imageLinkarray[index]);
    }
    dispatch(setAddProductApiCall(formData));
    navigate("/");
  };
  return (
    <>
      <div className="add-product-dashboard">
        <h1 className="fw-bold text-center" style={{ marginBottom: "100px" }}>
          Add product
        </h1>
        <div className="container">
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="name">Product name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Product name"
                id="name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Product description</label>
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Product description"
                id="description"
                rows="10"
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="price">Product price</label>
              <input
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                placeholder="Product price"
                id="price"
              />
            </div>
            <div className="form-group">
              <label htmlFor="discount">Discount</label>
              <input
                onChange={(e) => setDiscount(e.target.value)}
                type="number"
                placeholder="Product discount"
                id="discount"
              />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select id="gender" onChange={(e) => setGender(e.target.value)}>
                <option value="" selected disabled>
                  Select gender
                </option>
                <option value="men">Men</option>
                <option value="women">Women</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                onChange={(e) => setCategory(e.target.value)}
                id="category"
              >
                <option value="select category" selected disabled>
                  Select category
                </option>
                {gender === "men" &&
                  allCategories
                    ?.filter((cat) => cat.gender === "men")
                    .map((cat) => (
                      <option value={cat.title}>{cat.title}</option>
                    ))}
                {gender === "women" &&
                  allCategories
                    ?.filter((cat) => cat.gender === "women")
                    .map((cat) => (
                      <option value={cat.title}>{cat.title}</option>
                    ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="link">Image link</label>
              <input
                className="mb-4"
                onChange={(e) => setImageLink(e.target.value)}
                type="text"
                placeholder="Product image link"
                id="link"
                value={imageLink}
              />
              <span className="add-image-btn" onClick={addImageLink}>
                Add image
              </span>
            </div>
            <div className="form-group file-group">
              <span className="file-span">Image from device</span>
              <div className="images-section">
                {imageLinkarray?.map((image, index) => (
                  <div className="image-download position-relative">
                    <img
                      className="w-100 h-100"
                      key={index + 1}
                      src={image}
                      alt=""
                    />
                    <i
                      onClick={() => deleteImageLink(index)}
                      class="fa-solid fa-trash"
                    ></i>
                  </div>
                ))}
                {ImageFileArray?.map((image, index) => (
                  <div className="image-download position-relative">
                    <img
                      className="w-100 h-100"
                      key={index + 1}
                      src={URL.createObjectURL(image)}
                      alt=""
                    />
                    <i
                      onClick={() => deleteImageFile(index)}
                      class="fa-solid fa-trash"
                    ></i>
                  </div>
                ))}
                <label className="file-label" htmlFor="Image from device">
                  Upload image
                </label>
              </div>
              <input
                className="file-input"
                type="file"
                id="Image from device"
                onChange={addImageFile}
              />
            </div>
            <button type="submit" className="add-btn">
              Add product
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProductAdminDashboard;
