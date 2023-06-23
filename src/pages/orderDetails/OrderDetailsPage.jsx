import { useEffect } from "react";
import "./orderDetailsPage.css";
import { useDispatch, useSelector } from "react-redux";
import { setSingleOrderApiCall } from "../../redux/apiCall/orderApiCall";
import { Link, useParams } from "react-router-dom";

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { singleOrder } = useSelector((state) => state.orders);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
    dispatch(setSingleOrderApiCall(orderId));
  }, [dispatch, orderId]);
  return (
    <>
      <div className="order-details-page">
        <h1 className="text-center fw-bold" style={{ marginBottom: "100px" }}>
          Order details
        </h1>
        <div className="container">
          <div className="row main w-100 m-0">
            {singleOrder?.products?.map((product, index) => (
              <>
                <div key={index + 1} className="col-12 p-4">
                  <div className="row w-100 m-0">
                    <div className="col-8 d-flex">
                      <Link to={`/products/${product.product.name}`}>
                        {product.product.name}
                      </Link>{" "}
                      <span className="quantity-span">
                        <span>×</span> <span>{product.quantity}</span>
                      </span>
                    </div>
                    <div className="col-4 text-end">
                      EGP
                      {product.product.disCountPrecent > 0
                        ? product.product.price -
                          (product.product.disCountPrecent / 100) *
                            product.product.price
                        : product.product.price * product.quantity}
                    </div>
                  </div>
                </div>
                <hr className="mt-4 mb-4" />
              </>
            ))}
            <div
              className="col-12 price-section p-4"
              style={{ background: "rgba(0,0,0,.03)" }}
            >
              <h6 className="d-flex align-items-center justify-content-between mb-4">
                <span>SUBTOTAL</span>
                <span>EGP{singleOrder?.totalPrice - 30}</span>
              </h6>
              <h6 className="d-flex align-items-center justify-content-between mb-4">
                <span>SHIPPING</span>
                <span>EGP30</span>
              </h6>
              <h6 className="d-flex align-items-center justify-content-between mb-4">
                <span>PAYMENT METHOD:</span>
                <span>{singleOrder?.wayForPayment}</span>
              </h6>
              <hr />
              <h5 className="d-flex align-items-center justify-content-between">
                <span>Total</span>
                <span className="fw-bold">EGP{singleOrder?.totalPrice}</span>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetailsPage;
