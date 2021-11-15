import React, { useContext } from "react";
import "./signup.scss";
import { KeyboardArrowRight } from "@material-ui/icons";
import { Link } from "react-router-dom";
const Signup = ({ onNext }) => {
  const user = false;
  const handleLogOut = () => {
    localStorage.removeItem("netflix-user");
    // dispatch(logOut());
  };
  console.log(user);
  return (
    <div className="register">
      <div className="top">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="Netflix Logo"
        />
        {!user && (
          <Link to="/login">
            <button className="loginButton">Sign In</button>
          </Link>
        )}
        {user && (
          <button className="loginButton" onClick={handleLogOut}>
            Sign Out
          </button>
        )}
      </div>

      <div className="container">
        <h1>Unlimited movies, TV</h1>
        <h1>shows, and more. </h1>
        <h3>Watch anywhere. Cancel anytime.</h3>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        <div className="input">
          <input type="email" placeholder="Email Address" />
          <button className="registerButton" onClick={onNext}>
            Get Started <KeyboardArrowRight className="SIcon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
