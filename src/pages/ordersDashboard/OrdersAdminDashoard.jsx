import { useDispatch, useSelector } from "react-redux";
import "./OrdersAdminDashoard.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  setAllOrdersApiCall,
  setCancelOrderApiCall,
} from "../../redux/apiCall/orderApiCall";
import { Table } from "react-bootstrap";

const OrdersAdminDashoard = () => {
  const dispatch = useDispatch();
  const { allOrders } = useSelector((state) => state.orders);
  const { user } = useSelector((state) => state.auth);
  const { adminName } = useParams();
  const navigate = useNavigate();
  if (!user || user?.username !== adminName) {
    navigate("/");
  }
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
    const fetchOrders = async () => {
      await dispatch(setAllOrdersApiCall());
    };
    fetchOrders();
  }, [dispatch, user]);
  return (
    <div className="orders-dashboard-page">
      <h1 className="fw-bold text-center" style={{ marginBottom: "100px" }}>
        All orders
      </h1>
      <div className="container">
        {allOrders?.length > 0 ? (
          <Table style={{ textAlign: "center" }} striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>DATE</th>
                <th>PAYMENT</th>
                <th>TOTAL</th>
                <th>STATUS</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allOrders?.map((order, index) => {
                return (
                  <tr key={index + 1}>
                    <td>{index + 1}</td>
                    <td>
                      {new Date(order.createdAt).toLocaleString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td>{order.wayForPayment}</td>
                    <td>EGP{order.totalPrice}</td>
                    <td>
                      {order?.isCanceled ? (
                        <span
                          style={{ color: "red", textDecoration: "underline" }}
                        >
                          canceled
                        </span>
                      ) : (
                        <button
                          onClick={() => {
                            dispatch(setCancelOrderApiCall(order?._id));
                          }}
                          style={{
                            border: "0px",
                            background: "#000",
                            padding: "5px",
                            borderRadius: "3px",
                            color: "#fff",
                          }}
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                    <td>
                      <Link
                        to={`/account/${user?.username}/my-orders/${order?._id}`}
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : (
          <h1 className="fw-bold">No orders</h1>
        )}
      </div>
    </div>
  );
};

export default OrdersAdminDashoard;
