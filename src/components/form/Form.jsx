import * as React from "react";
import "./form.css";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Container } from "react-bootstrap";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoginApiCall,
  setRegisterApiCall,
} from "../../redux/apiCall/authApiCall";
import LoadingAnimation from "../loading/Loading";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Form({ setShowForm }) {
  const { user } = useSelector((state) => state.auth);
  const { registerErrorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  //  register state
  const [usernameRegister, setUsernameRegister] = useState("");
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");

  const [loading, setLoading] = useState(false);

  //   login state
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  // register submit form
  const registerFormSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      setRegisterApiCall({
        username: usernameRegister,
        email: emailRegister,
        password: passwordRegister,
      })
    );
  };
  React.useEffect(() => {
    if (!registerErrorMessage) {
      setValue(0); // Set tab value to 0 (login tab)
    } else {
      setValue(1); // set tab value to 1 (register tab)
    }
  }, [registerErrorMessage]);

  // login submit form
  const loginFormSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      setLoginApiCall({
        email: emailLogin,
        password: passwordLogin,
      })
    );
  };
  if (user) {
    setShowForm(false);
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Container>
        <header className="py-2 pe-2 text-end w-100">
          <i
            onClick={() => setShowForm(false)}
            class="fa-solid fa-xmark fs-3"
            style={{ cursor: "pointer" }}
          ></i>
        </header>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Login" {...a11yProps(0)} />
            <Tab label="Register" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <form onSubmit={loginFormSubmitHandler}>
            <div className="form-group">
              <label htmlFor="Email">Email</label>
              <input
                onChange={(e) => setEmailLogin(e.target.value)}
                type="email"
                id="Email"
                placeholder="Email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="Password">Password</label>
              <input
                onChange={(e) => setPasswordLogin(e.target.value)}
                type="password"
                id="Password"
                placeholder="Password"
                required
                minLength={8}
              />
            </div>
            <button className="form-btn position-relative">
              <span>Login</span> <span>{loading && <LoadingAnimation />}</span>
            </button>
          </form>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <form onSubmit={registerFormSubmitHandler}>
            <div className="form-group">
              <label htmlFor="Username">Username</label>
              <input
                onChange={(e) => setUsernameRegister(e.target.value)}
                type="text"
                id="Username"
                placeholder="Username"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="Email">Email</label>
              <input
                onChange={(e) => setEmailRegister(e.target.value)}
                type="email"
                id="Email"
                placeholder="Email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="Password">Password</label>
              <input
                onChange={(e) => setPasswordRegister(e.target.value)}
                type="password"
                id="Password"
                placeholder="Password"
                minLength={8}
                required
              />
            </div>
            <button className="form-btn">Register</button>
          </form>
        </TabPanel>
      </Container>
    </Box>
  );
}
