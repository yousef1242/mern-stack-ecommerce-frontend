import { useEffect, useState } from "react";
import "./cartPage.css";
import { useSelector, useDispatch } from "react-redux";
import {
  setCartForUserApiCall,
  setDeleteAllProductsCartApiCall,
  setDeleteProductCartApiCall,
  setUpdateCartApiCall,
} from "../../redux/apiCall/cartApiCall";
import { Link, useNavigate } from "react-router-dom";
import {
  setDeleteAllProductsCart,
  setDeleteProductCart,
} from "../../redux/Slice/cartSlice";
import emptyImage from "../../images/empty.gif";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const [quantities, setQuantities] = useState({});
  const [cartWithTotalPrices, setCartWithTotalPrices] = useState(0);
  const handleQuantityDecrease = (index) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [`quantaty${index}`]: prevQuantities[`quantaty${index}`] - 1,
    }));
  };

  const handleQuantityIncrease = (index) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [`quantaty${index}`]: prevQuantities[`quantaty${index}`] + 1,
    }));
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
    if (cart) {
      const totalPrice = cart.reduce((total, item) => {
        const discountedPrice =
          item?.product?.price * (1 - item?.product?.disCountPrecent / 100);
        const itemTotalPrice = discountedPrice * item?.quantaty;
        return total + itemTotalPrice;
      }, 0);
      setCartWithTotalPrices(totalPrice);
      // Create state variables for each cart item
      cart.forEach((item, index) => {
        setQuantities((prevQuantities) => ({
          ...prevQuantities,
          [`quantaty${index + 1}`]: item.quantaty,
        }));
      });
    }
  }, [cart]);

  useEffect(() => {
    dispatch(setCartForUserApiCall());
  }, []);
  return (
    <>
      <div className="cart-page">
        <div className="container">
          {cart?.length > 0 || !user ? (
            <>
              <h1 className="w-100 cart-text">Cart</h1>
              <div className="row w-100 m-0">
                <div className="col-12 col-lg-7">
                  <div className="top-products d-flex align-items-center justify-content-between">
                    <Link className="home-link" to={`/shop`}>
                      Continue Shopping
                    </Link>
                    {cart?.length > 0 && (
                      <button
                        onClick={() => {
                          dispatch(setDeleteAllProductsCartApiCall());
                          dispatch(setDeleteAllProductsCart());
                        }}
                      >
                        Delete all products
                      </button>
                    )}
                  </div>
                  <hr />
                  <div className="row mt-5 w-100 m-0">
                    {cart?.map((cart, index) => (
                      <>
                        {" "}
                        <div className="col-12 product-div">
                          <div className="row w-100 m-0">
                            <div className="col-4">
                              <img
                                className="img-fluid"
                                src={cart?.imageProduct}
                                alt=""
                              />
                            </div>
                            <div className="col-8">
                              <div className="row w-100 m-0">
                                <div className="col-6 col-md-4">
                                  <span>{cart?.nameProduct}</span>
                                  <span className="d-block price-span">
                                    EGP
                                    {cart?.product?.price -
                                      (cart?.product?.disCountPrecent / 100) *
                                        cart?.product?.price}
                                  </span>
                                </div>
                                <div className="col-6 col-md-4 text-center">
                                  <div className="quantaty-section">
                                    <button
                                      disabled={
                                        quantities[`quantaty${index + 1}`] === 1
                                      }
                                      onClick={() => {
                                        handleQuantityDecrease(index + 1);
                                      }}
                                      className="decrease"
                                    >
                                      -
                                    </button>
                                    <input
                                      type="number"
                                      className="number"
                                      value={quantities[`quantaty${index + 1}`]}
                                    />
                                    <button
                                      className="increase"
                                      onClick={() => {
                                        handleQuantityIncrease(index + 1);
                                      }}
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                                <div className="col-6 col-md-4 text-md-end">
                                  {" "}
                                  EGP
                                  {cart?.disCountPrecent > 0
                                    ? (cart?.product?.disCountPrecent / 100) *
                                      cart?.product?.price *
                                      cart?.quantaty
                                    : cart?.product?.price * cart?.quantaty}
                                </div>
                                <div className="col-6 col-md-12 text-center text-md-end">
                                  <i
                                    onClick={() => {
                                      dispatch(
                                        setDeleteProductCartApiCall(cart?._id)
                                      );
                                      dispatch(setDeleteProductCart(cart));
                                    }}
                                    className="fa-solid fa-xmark"
                                  ></i>
                                </div>
                              </div>
                            </div>
                          </div>
                          {quantities[`quantaty${index + 1}`] !==
                            cart?.quantaty && (
                            <button
                              className="log-value"
                              onClick={() => {
                                dispatch(
                                  setUpdateCartApiCall(cart?._id, {
                                    quantaty: `${
                                      quantities[`quantaty${index + 1}`]
                                    }`,
                                  })
                                );
                              }}
                            >
                              Update
                            </button>
                          )}
                        </div>
                        <hr />
                      </>
                    ))}
                  </div>
                </div>
                <div
                  className="col-12 col-lg-5 p-5"
                  style={{
                    border: "1px solid rgb(202 202 202)",
                    height: "460px",
                  }}
                >
                  <h4>Cart total</h4>
                  <hr />
                  <h6 className="d-flex align-items-center justify-content-between">
                    <span>SUBTOTAL</span>
                    <span>EGP{(cartWithTotalPrices).toFixed(1)}</span>
                  </h6>
                  <hr />
                  <h6 className="d-flex align-items-center justify-content-between">
                    <span>SHIPPING</span>
                    <span>EGP30</span>
                  </h6>
                  <hr />
                  <h5 className="d-flex align-items-center justify-content-between">
                    <span>Total</span>
                    {typeof cartWithTotalPrices === "number" && (
                      <span className="fw-bold">
                        EGP {(cartWithTotalPrices + 30).toFixed(1)}
                      </span>
                    )}
                  </h5>
                  <hr />
                  <Link to={`/checkout`} className="check-out-link w-100 mt-4">
                    Check out
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <div className="empty-cart-section d-flex flex-column justify-content-center align-items-center pb-5">
              <img
                data-aos="fade-right"
                style={{ objectFit: "cover", width: "150px", height: "150px" }}
                src={emptyImage}
                alt=""
                className="mb-4"
              />
              <h4 data-aos="fade-left" className="my-4 fw-bold">
                Your cart is empty
              </h4>
              <Link
                data-aos="fade-right"
                className="home-link"
                style={{ width: "fit-content" }}
                to={`/shop`}
              >
                Continue Shopping
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartPage;
