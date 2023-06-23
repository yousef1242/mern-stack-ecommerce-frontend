import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { ToastContainer } from "react-toastify";
import LoadingWebsite from "./components/LoadingWebsite/LoadingWebsite";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import AOS from "aos";
import "aos/dist/aos.css";
import upArrow from "./images/arrow up.svg";
import "swiper/css";
import Footer from "./components/footer/Footer";
import ShopPage from "./pages/shop/Shop";
import ProductDetails from "./pages/productDetails/ProductDetails";
import CartPage from "./pages/cart/CartPage";
import { useDispatch, useSelector } from "react-redux";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import { setAllProductsApiCall } from "./redux/apiCall/productsApiCall";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import AccountPage from "./pages/accountPage/AccountPage";
import WishlistPage from "./pages/wishlist/WishlistPage";
import MyOrdersPage from "./pages/my-orders/MyOrdersPage";
import OrderDetailsPage from "./pages/orderDetails/OrderDetailsPage";
import AccountDetailsPage from "./pages/accountDetails/AccountDetailsPage";
import UsersAdminDashboard from "./pages/usersDashbaord/UsersAdminDashboard";
import OrdersAdminDashoard from "./pages/ordersDashboard/OrdersAdminDashoard";
import ProductsAdminDashboard from "./pages/productsAdminDashboard/ProductsAdminDashboard";
import AddProductAdminDashboard from "./pages/addProductDashboard/AddProductAdminDashboard";
import CategoriesAdminDashboard from "./pages/categoriesDashboard/CategoriesAdminDashboard";
import AddCategoryAdminDashboard from "./pages/addCategoryDashboard/AddCategoryAdminDashboard";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

function App() {
  const { products } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [up, setUp] = useState(false);
  useEffect(() => {
    dispatch(setAllProductsApiCall());
    setTimeout(() => {
        setLoading(false);
    }, 5000);
    const handleScroll = () => {
      if (window.pageYOffset > 89.11124420166016) {
        setUp(true);
      } else {
        setUp(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, products]);
  return (
    <>
      {!loading ? (
        <>
          <ToastContainer theme="colored" />
          <Navbar />
          {/* scroll top button */}
          <button
            onClick={() => {
              window.scrollTo({
                behavior: "smooth",
                top: 0,
              });
            }}
            className={`up-btn ${up && "show"}`}
          >
            <img src={upArrow} alt="" />
          </button>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/products/:productName" element={<ProductDetails />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/account/:accountUsername" element={<AccountPage />} />
            <Route
              path="/account/:userName/wishlist"
              element={<WishlistPage />}
            />
            <Route
              path="/account/:userName/my-orders/:orderId"
              element={<OrderDetailsPage />}
            />
            <Route
              path="/account/:userName/my-orders"
              element={<MyOrdersPage />}
            />
            <Route
              path="/account/:userName/account-details"
              element={<AccountDetailsPage />}
            />
            <Route
              path="/checkout"
              element={
                <Elements stripe={stripePromise}>
                  <CheckoutPage />
                </Elements>
              }
            />
            <Route
              path="/dashboard/:adminName/users"
              element={
                user?.isAdmin ? <UsersAdminDashboard /> : <Navigate to={"/"} />
              }
            />
            <Route
              path="/dashboard/:adminName/orders"
              element={
                user?.isAdmin ? <OrdersAdminDashoard /> : <Navigate to={"/"} />
              }
            />
            <Route
              path="/dashboard/:adminName/products"
              element={
                user?.isAdmin ? (
                  <ProductsAdminDashboard />
                ) : (
                  <Navigate to={"/"} />
                )
              }
            />
            <Route
              path="/dashboard/:adminName/add-product"
              element={
                user?.isAdmin ? (
                  <AddProductAdminDashboard />
                ) : (
                  <Navigate to={"/"} />
                )
              }
            />
            <Route
              path="/dashboard/:adminName/categories"
              element={
                user?.isAdmin ? (
                  <CategoriesAdminDashboard />
                ) : (
                  <Navigate to={"/"} />
                )
              }
            />
            <Route
              path="/dashboard/:adminName/add-category"
              element={
                user?.isAdmin ? (
                  <AddCategoryAdminDashboard />
                ) : (
                  <Navigate to={"/"} />
                )
              }
            />
          </Routes>
          <Footer />
        </>
      ) : (
        <>
          <LoadingWebsite />
        </>
      )}
    </>
  );
}

export default App;
