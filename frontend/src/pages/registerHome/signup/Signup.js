import React, { useContext, useState } from "react";
import "./signup.scss";
import { KeyboardArrowRight } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { EMAIL_HOLDER } from "../../../context/constants/userConstant";
import { logout } from "../../../context/action/userAction";
const Signup = ({ onNext }) => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch({ type: EMAIL_HOLDER, payload: email });
    onNext();
  };
  const handleLogOut = () => {
    dispatch(logout());
  };
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
          <input
            type="email"
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="registerButton" onClick={handleClick}>
            Get Started <KeyboardArrowRight className="SIcon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
