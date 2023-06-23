import { useDispatch, useSelector } from "react-redux";
import "./UsersAdminDashboard.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { setAllUsersApiCall } from "../../redux/apiCall/authApiCall";
import Table from "react-bootstrap/esm/Table";

const UsersAdminDashboard = () => {
  const dispatch = useDispatch();
  const { allUsers } = useSelector((state) => state.auth);
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
      await dispatch(setAllUsersApiCall());
    };
    fetchOrders();
  }, [dispatch, user]);
  return (
    <>
      <div className="users-dashboard-page">
        <h1 className="fw-bold text-center" style={{ marginBottom: "100px" }}>
          All users
        </h1>
        <div className="container">
          {allUsers?.length > 0 ? (
            <Table style={{ textAlign: "center" }} striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>USERNAME</th>
                  <th>EMAIL</th>
                  <th>DATE</th>
                </tr>
              </thead>
              <tbody>
                {allUsers?.map((user, index) => {
                  return (
                    <tr key={index + 1}>
                      <td>{index + 1}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>
                        {new Date(user.createdAt).toLocaleString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          ) : (
            <h1 className="fw-bold">No users</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default UsersAdminDashboard;
