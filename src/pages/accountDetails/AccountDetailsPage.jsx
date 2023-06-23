import { useEffect, useState } from "react";
import "./accountDetailsPage.css";
import { useSelector, useDispatch } from "react-redux";
import {
  setSingleUserApiCall,
  setUpdateUserInfoApiCall,
} from "../../redux/apiCall/authApiCall";
import { useNavigate, useParams } from "react-router-dom";

const AccountDetailsPage = () => {
  const navigate = useNavigate();
  const { userName } = useParams();
  const { singleUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  //   login state
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  if (!singleUser || singleUser?.username !== userName) {
    navigate("/");
  }
  useEffect(() => {
    dispatch(setSingleUserApiCall(userName));
  }, [userName]);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
    if (singleUser) {
      setEmail(singleUser?.email);
      setUsername(singleUser?.username);
    }
  }, [singleUser]);
  const loginFormSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      setUpdateUserInfoApiCall(singleUser?._id, {
        email: email,
        username: username,
      })
    );
  };
  return (
    <>
      <div className="account-details-page">
        <h1 className="text-center fw-bold" style={{ marginBottom: "100px" }}>
          Account details
        </h1>
        <div className="container">
          <form onSubmit={loginFormSubmitHandler}>
            <div className="form-group">
              <label htmlFor="Username">Username</label>
              <input
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                id="Username"
                value={username}
                placeholder="Username"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="Email">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="Email"
                placeholder="Email"
                required
                value={email}
              />
            </div>
            <button className="form-btn position-relative">
              <span>Save changes</span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AccountDetailsPage;
