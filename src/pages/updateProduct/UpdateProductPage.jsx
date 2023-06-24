import { useEffect, useState } from "react";
import "./UpdateProductPage.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  seUpdateProductApiCall,
  setAddProductApiCall,
  setSingleProductApiCall,
} from "../../redux/apiCall/productsApiCall";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProductPage = () => {
  const dispatch = useDispatch();
  const { productName } = useParams();
  const navigate = useNavigate();
  const { allCategories } = useSelector((state) => state.categories);
  const { singleProduct } = useSelector((state) => state.products);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [discount, setDiscount] = useState();
  const [gender, setGender] = useState("");
  const [category, setCategory] = useState("");
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);
  useEffect(() => {
    if (singleProduct) {
      setName(singleProduct?.name);
      setDescription(singleProduct?.description);
      setPrice(singleProduct?.price);
      setCategory(singleProduct?.category);
      setGender(singleProduct?.gender);
      setDiscount(singleProduct?.disCountPrecent);
    }
  }, [singleProduct]);
  useEffect(() => {
    dispatch(setSingleProductApiCall(productName));
  }, [dispatch, productName]);
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
    dispatch(
      seUpdateProductApiCall(
        {
          name: name,
          description: description,
          price: price,
          disCountPrecent: discount,
          category: category,
          gender: gender,
        },
        productName
      )
    );
    navigate("/");
  };
  return (
    <>
      <div className="add-product-dashboard">
        <h1 className="fw-bold text-center" style={{ marginBottom: "100px" }}>
          Update product
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
                value={name}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Product description</label>
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Product description"
                id="description"
                rows="10"
                value={description}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="price">Product price</label>
              <input
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                placeholder="Product price"
                id="price"
                value={price}
              />
            </div>
            <div className="form-group">
              <label htmlFor="discount">Discount</label>
              <input
                onChange={(e) => setDiscount(e.target.value)}
                type="number"
                placeholder="Product discount"
                id="discount"
                value={discount}
              />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
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
                value={category}
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
            <button type="submit" className="add-btn">
              Update product
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProductPage;
