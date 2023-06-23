import { useEffect } from "react";
import "./accountPage.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  setLogoutUser,
  setSingleUserApiCall,
} from "../../redux/apiCall/authApiCall";

const AccountPage = () => {
  const { accountUsername } = useParams();
  const { singleUser } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(setSingleUserApiCall(accountUsername));
  }, [accountUsername]);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
    if (!user || user?.username !== accountUsername) {
      navigate("/");
    }
  }, [user]);
  return (
    <>
      <div className="account-page">
        <h1 className="text-center fw-bold mb-5">
          Hello {singleUser?.username}
        </h1>
        <div className="container">
          <div className="row">
            {!singleUser?.isAdmin ? (
              <Link
                className="col-12 col-md-6 mb-4"
                to={`/account/${singleUser?.username}/wishlist`}
              >
                <div className="card">
                  <i class="fa-regular fa-heart"></i>
                  <span>Wishlist</span>
                </div>
              </Link>
            ) : (
              <Link
                className="col-12 col-md-6 mb-4"
                to={`/dashboard/${singleUser?.username}/users`}
              >
                <div className="card">
                  <i class="fa-regular fa-user"></i>
                  <span>Users</span>
                </div>
              </Link>
            )}
            {!singleUser?.isAdmin ? (
              <Link
                className="col-12 col-md-6 mb-4"
                to={`/account/${singleUser?.username}/my-orders`}
              >
                <div className="card">
                  <i class="fa-solid fa-truck-fast"></i>
                  <span>My-Orders</span>
                </div>
              </Link>
            ) : (
              <Link
                className="col-12 col-md-6 mb-4"
                to={`/dashboard/${singleUser?.username}/orders`}
              >
                <div className="card">
                  <i class="fa-solid fa-truck-fast"></i>
                  <span>Orders</span>
                </div>
              </Link>
            )}
            {singleUser?.isAdmin && (
              <Link
                className="col-12 col-md-6 mb-4 mb-md-0"
                to={`/dashboard/${singleUser?.username}/products`}
              >
                <div className="card">
                  <i class="fa-brands fa-product-hunt"></i>
                  <span>Products</span>
                </div>
              </Link>
            )}
            {singleUser?.isAdmin && (
              <Link
                className="col-12 col-md-6 mb-4 mb-md-0"
                to={`/dashboard/${singleUser?.username}/add-product`}
              >
                <div className="card">
                  <i class="fa-solid fa-square-plus"></i>
                  <span>Add product</span>
                </div>
              </Link>
            )}
            {singleUser?.isAdmin && (
              <Link
                className="col-12 col-md-6 mb-4 mb-md-0 mt-4"
                to={`/dashboard/${singleUser?.username}/categories`}
              >
                <div className="card">
                  <i class="fa-solid fa-certificate"></i>
                  <span>Categories</span>
                </div>
              </Link>
            )}
            {singleUser?.isAdmin && (
              <Link
                className="col-12 col-md-6 mb-4 mb-md-0 mt-4"
                to={`/dashboard/${singleUser?.username}/add-category`}
              >
                <div className="card">
                  <i class="fa-solid fa-folder-plus"></i>
                  <span>Add category</span>
                </div>
              </Link>
            )}
            <Link
              className="col-12 col-md-6 mb-4 mb-md-0 mt-4"
              to={`/account/${singleUser?.username}/account-details`}
            >
              <div className="card">
                <i class="fa-solid fa-circle-info"></i>
                <span>Account Details</span>
              </div>
            </Link>
            <div className="col-12 mt-4 col-md-6">
              <div
                onClick={() => {
                  dispatch(setLogoutUser());
                }}
                className="card"
                style={{ cursor: "pointer" }}
              >
                <i class="fa-solid fa-right-from-bracket"></i>
                <span>Logout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountPage;
