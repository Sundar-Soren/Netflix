import React from "react";
import "./signup3.scss";
import { Link } from "react-router-dom";
import SignupNavbar from "./SignupNavbar";
import { useSelector } from "react-redux";
const Signup3 = () => {
  const { user, error } = useSelector((state) => state.user);
  return (
    <>
      <SignupNavbar />
      <div className="signup3">
        {user ? (
          <>
            <h1>Accout Create Successfully</h1>
            <Link to="/">To Home</Link>
          </>
        ) : (
          <>
            <h1>Failed To Create Accout</h1>
            {error && <h2>{error}</h2>}
            <button
              onClick={() => window.location.reload()}
              className="reload-button"
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Signup3;
