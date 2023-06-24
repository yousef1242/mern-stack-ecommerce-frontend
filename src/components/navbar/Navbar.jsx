import cookie from "js-cookie";
import logo from "../../images/logo website.png";
import { Link } from "react-router-dom";
import "./navbar.css";
import { useEffect, useState } from "react";
import Search from "../search/Search";
import { Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setAllCategoriesApiCall,
} from "../../redux/apiCall/categoriesApiCall";
import Form from "../form/Form";
import { setCartForUserApiCall } from "../../redux/apiCall/cartApiCall";

const Navbar = () => {
  const dispatch = useDispatch();
  const { allCategories } = useSelector((state) => state.categories);
  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const [showModel, setShowModel] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [show, setShow] = useState(false);
  const [men, setMen] = useState(true);
  const [women, setWomen] = useState(false);

  const handleCloseModel = () => setShowModel(false);
  const handleShowModel = () => setShowModel(true);
  useEffect(() => {
    dispatch(setAllCategoriesApiCall());
    dispatch(setCartForUserApiCall());
  }, []);

  return (
    <>
      <div className="navbar">
        <div className="container">
          <div className="row w-100 m-0 align-items-center">
            <div className="col-1 col-md-4">
              <i onClick={handleShowModel} className="fa-solid fa-bars"></i>
            </div>
            <div className="col-4 col-md-4 text-center">
              <Link to={`/`}>
                <img className="logo" src={logo} alt="logo" />
              </Link>
            </div>
            <div className="col-7 col-md-4 text-end">
              {!user ? (
                <span onClick={() => setShowForm(true)} className="login-icon">
                  Login
                </span>
              ) : (
                <Link to={`/account/${user?.username}`}>My Account</Link>
              )}
              <Link className="cart-link ms-3" to={`/cart`}>
                <i className="fa-solid fa-basket-shopping"></i>{" "}
                <span>{cart?.length}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Search setShow={setShow} show={show} />
      {showModel && (
        <Offcanvas
          className="w-100 offacavas-bar"
          show={showModel}
          onHide={handleCloseModel}
        >
          <Offcanvas.Header closeButton></Offcanvas.Header>
          <Offcanvas.Body>
            <div className="row h-100 w-100 m-0">
              <div className="col-4 hr">
                <span
                  className={`mb-3 ${men && "underline"}`}
                  onMouseMove={() => {
                    setMen(true);
                    setWomen(false);
                  }}
                >
                  Men
                </span>
                <span
                  className={women && "underline"}
                  onMouseMove={() => {
                    setWomen(true);
                    setMen(false);
                  }}
                >
                  Women
                </span>
              </div>
              <div className="col-8">
                {men && (
                  <>
                    <Link
                      onClick={handleCloseModel}
                      className="up-link"
                      to={`/shop?gender=men`}
                    >
                      men
                    </Link>
                    <ul>
                      {allCategories
                        ?.filter((cat) => cat.gender === "men")
                        .map((cat, index) => (
                          <li key={index}>
                            <Link
                              onClick={handleCloseModel}
                              to={`/shop?gender=men&category=${cat.title}`}
                            >
                              {cat.title}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </>
                )}
                {women && (
                  <>
                    <Link
                      onClick={handleCloseModel}
                      className="up-link"
                      to={`/shop?gender=women`}
                    >
                      women
                    </Link>
                    <ul>
                      {allCategories
                        ?.filter((cat) => cat.gender === "women")
                        .map((cat, index) => (
                          <li key={index}>
                            <Link
                              onClick={handleCloseModel}
                              to={`/shop?gender=women&category=${cat.title}`}
                            >
                              {cat.title}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      )}
      {showForm && <Form setShowForm={setShowForm} />}
    </>
  );
};

export default Navbar;
