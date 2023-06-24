import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import "./checkoutPage.css";
import { useDispatch, useSelector } from "react-redux";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import {
  setCartForUserApiCall,
  setDeleteAllProductsCartApiCall,
} from "../../redux/apiCall/cartApiCall";
import CheckOutForm from "./checkoutForm";
import { setAddNewOrderApiCall } from "../../redux/apiCall/orderApiCall";
import { setDeleteAllProductsCart } from "../../redux/Slice/cartSlice";
import axios from "axios";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const element = useElements();
  const [cartWithTotalPrices, setCartWithTotalPrices] = useState(0);
  const [cashLoading, setCashLoading] = useState(false);
  const [visaLoading, setVisaLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [governorate, setGovernorate] = useState("Cairo");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    const fetchCartUser = async () => {
      await dispatch(setCartForUserApiCall());
    };
    fetchCartUser();
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
    }
  }, []);
  if (!cart.length) {
    navigate("/");
  }
  const productIds = cart?.map((item) => item.product._id);
  const quantaties = cart?.map((item) => item.quantaty);
  // cash form submit
  const formCashSubmitHandler = (e) => {
    e.preventDefault();
    if (firstName === "") return toast.error("Please write your first name");
    if (secondName === "") return toast.error("Please write your second name");
    if (phone === "") return toast.error("Please write your phone");
    if (email === "") return toast.error("Please write your email");
    if (governorate === "") return toast.error("Please write your governorate");
    if (city === "") return toast.error("Please write your city");
    if (address === "") return toast.error("Please write your address");
    setCashLoading(true);
    dispatch(
      setAddNewOrderApiCall({
        user: user?.id,
        firstName: firstName,
        secondName: secondName,
        email: email,
        phoneNumber: phone,
        Governorate: governorate,
        city: city,
        address: address,
        wayForPayment: "cash",
        totalPrice: (cartWithTotalPrices + 30).toFixed(2),
        productId: productIds,
        quantaties: quantaties,
      })
    ).then(() => {
      navigate("/");
      dispatch(setDeleteAllProductsCart());
      dispatch(setDeleteAllProductsCartApiCall());
    });
  };
  // credit form submit
  const formCreditSubmitHandler = async (e) => {
    e.preventDefault();
    if (firstName === "") return toast.error("Please write your first name");
    if (secondName === "") return toast.error("Please write your second name");
    if (phone === "") return toast.error("Please write your phone");
    if (email === "") return toast.error("Please write your email");
    if (governorate === "") return toast.error("Please write your governorate");
    if (city === "") return toast.error("Please write your city");
    if (address === "") return toast.error("Please write your address");
    const cardElement = element.getElement("card");
    const billingInfo = {
      email,
    };
    try {
      // Send payment request to server
      const paymentIntent = await axios.post(
        "https://mern-stack-ecommerce-backend.onrender.com/api/orders/payment",
        {
          amount: (cartWithTotalPrices + 30).toFixed(2) * 100,
        }
      );
      // Create payment method and confirm payment
      const paymentMethodObj = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: billingInfo,
      });

      const confirmPayment = await stripe.confirmCardPayment(
        paymentIntent.data.client_secret,
        {
          payment_method: paymentMethodObj.paymentMethod.id,
        }
      );

      if (confirmPayment.error) {
        console.log(confirmPayment.error.message);
      }
      dispatch(
        setAddNewOrderApiCall({
          user: user?.id,
          firstName: firstName,
          secondName: secondName,
          email: email,
          phoneNumber: phone,
          Governorate: governorate,
          city: city,
          address: address,
          wayForPayment: "credit",
          totalPrice: (cartWithTotalPrices + 30).toFixed(2),
          productId: productIds,
          quantaties: quantaties,
        })
      );
      navigate("/");
      setVisaLoading(true);
      toast.success("Payment has been successful");
      dispatch(setDeleteAllProductsCart());
      dispatch(setDeleteAllProductsCartApiCall());
      cardElement.clear();
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div className="check-out-page">
        <div className="container">
          <div className="row w-100 m-0">
            <div className="col-12 col-lg-7">
              <form id="info-form">
                <div className="form-group">
                  <label htmlFor="firstName">First name</label>
                  <input
                    required
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="secondName">Second name</label>
                  <input
                    type="text"
                    id="secondName"
                    value={secondName}
                    onChange={(event) => setSecondName(event.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="Phone">Phone</label>
                  <input
                    type="text"
                    id="Phone"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="Email">Email</label>
                  <input
                    type="email"
                    id="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleSelectVendor">Governorate</label>
                  <select
                    className="form-control"
                    style={{ borderRadius: "0px" }}
                    id="exampleSelectVendor"
                    name="governorate"
                    value={governorate}
                    onChange={(event) => setGovernorate(event.target.value)}
                  >
                    <option value="">Select Governorate</option>
                    <option value="Cairo">Cairo</option>
                    <option value="Alexandria">Alexandria</option>
                    <option value="Aswan">Aswan</option>
                    <option value="Asyut">Asyut</option>
                    <option value="Beheira">Beheira</option>
                    <option value="Beni Suef">Beni Suef</option>
                    <option value="Dakahlia">Dakahlia</option>
                    <option value="Damietta">Damietta</option>
                    <option value="Faiyum">Faiyum</option>
                    <option value="Giza">Giza</option>
                    <option value="Ismailia">Ismailia</option>
                    <option value="Kafr El Sheikh">Kafr El Sheikh</option>
                    <option value="Luxor">Luxor</option>
                    <option value="Matruh">Matruh</option>
                    <option value="Minya">Minya</option>
                    <option value="Monufia">Monufia</option>
                    <option value="New Valley">New Valley</option>
                    <option value="North Sinai">North Sinai</option>
                    <option value="Port Said">Port Said</option>
                    <option value="Qalyubia">Qalyubia</option>
                    <option value="Qena">Qena</option>
                    <option value="Red Sea">Red Sea</option>
                    <option value="Sharqia">Sharqia</option>
                    <option value="Sohag">Sohag</option>
                    <option value="South Sinai">South Sinai</option>
                    <option value="Suez">Suez</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="City">City</label>
                  <input
                    type="text"
                    id="City"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="Address">Address</label>
                  <input
                    type="text"
                    id="Address"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                  />
                </div>
              </form>
            </div>
            <div
              className="col-12 col-lg-5 p-5 h-auto"
              style={{
                border: "1px solid rgb(202 202 202)",
                height: "460px",
              }}
            >
              <h4>Cart total</h4>
              <hr />
              <h6 className="d-flex align-items-center justify-content-between">
                <span>SUBTOTAL</span>
                <span>EGP{cartWithTotalPrices.toFixed(1)}</span>
              </h6>
              <hr />
              <h6 className="d-flex align-items-center justify-content-between">
                <span>SHIPPING</span>
                <span>EGP30</span>
              </h6>
              <hr />
              <h5 className="d-flex align-items-center justify-content-between">
                <span>Total</span>
                <span className="fw-bold">
                  EGP
                  {typeof cartWithTotalPrices === "number" &&
                    (cartWithTotalPrices + 30).toFixed(1)}
                </span>
              </h5>
              <CheckOutForm
                cashLoading={cashLoading}
                visaLoading={visaLoading}
                formCreditSubmitHandler={formCreditSubmitHandler}
                formCashSubmitHandler={formCashSubmitHandler}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
