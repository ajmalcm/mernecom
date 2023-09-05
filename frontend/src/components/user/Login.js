import React, { useState, useEffect } from "react";
import "./LoginRegister.css";
import { useNavigate } from "react-router-dom";
import { clearErrors, loginUser } from "../redux/actions/userAction";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Loading from "../loading/Loading";
import Metadata from "../layout/Header/Metadata";

const Login = () => {
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    loginEmail: "",
    loginPassword: "",
  });

  const { loginEmail, loginPassword } = loginData;
  const redirect = window.location.search
    ? window.location.search.split("=")[1]
    : "/account";

  const onLogindataChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const onLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(loginData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      toast.success("logged in successfully.");
      navigate(redirect);
    }
  }, [error, dispatch, isAuthenticated, redirect]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Metadata title="LOGIN" />
          <div className="formContainer">
            {/* loginform */}

            <form className="form" onSubmit={onLoginSubmit}>
              <p className="title">Login </p>
              <p className="message">
                Login now and get full access to our app.{" "}
              </p>

              <label>
                <input
                  required=""
                  placeholder=""
                  type="email"
                  className="input"
                  name="loginEmail"
                  value={loginEmail}
                  onChange={onLogindataChange}
                />
                <span>Email</span>
              </label>

              <label>
                <input
                  required=""
                  placeholder=""
                  type="password"
                  className="input"
                  name="loginPassword"
                  value={loginPassword}
                  onChange={onLogindataChange}
                />
                <span>Password</span>
              </label>
              <button className="submit" type="submit">
                Submit
              </button>
              <Link
                to="/password/forgot"
                className="fp"
                style={{ color: "crimson" }}
              >
                Forgot Password
              </Link>
              <p className="signin">
                Dont't have an account ? <Link to="/register">Register</Link>{" "}
              </p>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default Login;
