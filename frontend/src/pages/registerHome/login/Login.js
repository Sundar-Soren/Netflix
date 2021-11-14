import "./login.scss";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../../../context/action/userAction";
import { useSelector, useDispatch } from "react-redux";
const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });

  const dispatch = useDispatch();
  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.user
  );

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(user));
  };

  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="Netflix Logo"
          />
        </div>
      </div>

      <div className="container">
        <form>
          <h1>Sign in</h1>
          {error && (
            <p className="error-messages">
              <b>{error}</b>. Please try again
            </p>
          )}
          <input
            type="email"
            placeholder="Email or phone number"
            name="email"
            onChange={handleInput}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            autoComplete="none"
            onChange={handleInput}
          />
          <button onClick={handleSubmit}>
            {loading && !error && <b>Loading...</b>}
            {!loading && <b>Sign Up</b>}
            {error && <b>Sign Up</b>}
          </button>
          <span>
            New to Netflix?
            <Link to="/signup">
              <b>Sign up now</b>
            </Link>
            .
          </span>
          <p>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. Learn more.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
