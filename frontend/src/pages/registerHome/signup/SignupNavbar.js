import React from "react";
import "./signupNavbar.scss";
const SignupNavbar = () => {
  return (
    <div className="signupNavbar">
      <div className="navbar-sign">
        <div className="container">
          <div>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
              alt="Netflix Logo"
            />
          </div>
          <div className="signup-div">Sign In</div>
        </div>
      </div>
    </div>
  );
};

export default SignupNavbar;
