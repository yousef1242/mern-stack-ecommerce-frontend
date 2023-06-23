import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import "./myOrdersPage.css";
import { useSelector, useDispatch } from "react-redux";
import { setOrdersUserApiCall } from "../../redux/apiCall/orderApiCall";
import { Link, useNavigate, useParams } from "react-router-dom";

const MyOrdersPage = () => {
  const dispatch = useDispatch();
  const { userOrders } = useSelector((state) => state.orders);
  const { user } = useSelector((state) => state.auth);
  const { userName } = useParams();
  const navigate = useNavigate();
  if (!user || user?.username !== userName) {
    navigate("/");
  }
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
    const fetchOrders = async () => {
      await dispatch(setOrdersUserApiCall(user?.id));
    };
    fetchOrders();
  }, [dispatch, user]);
  return (
    <>
      <div className="my-orders-page">
        <h1 className="text-center fw-bold" style={{ marginBottom: "100px" }}>
          My orders
        </h1>
        <div className="container">
          {userOrders?.length > 0 ? (
            <Table style={{ textAlign: "center" }} striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>DATE</th>
                  <th>STATUS</th>
                  <th>PAYMENT</th>
                  <th>TOTAL</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {userOrders?.map((order, index) => {
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
                      <td>{!order.isCanceled ? "accepted" : "canceled"}</td>
                      <td>{order.wayForPayment}</td>
                      <td>EGP{order.totalPrice}</td>
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
    </>
  );
};

export default MyOrdersPage;
