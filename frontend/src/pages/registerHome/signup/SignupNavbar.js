import React from "react";
import "./signupNavbar.scss";
import { Link } from "react-router-dom";
const SignupNavbar = () => {
  return (
    <div className="signupNavbar">
      <div className="navbar-sign">
        <div className="container">
          <img
            className="logo-image"
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="Netflix Logo"
          />
          <Link to="/login">
            <p className="signup-div">Sign In</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupNavbar;
