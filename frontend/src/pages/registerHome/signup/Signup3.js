import React from "react";
import "./signup3.scss";
import { Link } from "react-router-dom";
import SignupNavbar from "./SignupNavbar";
const Signup3 = () => {
  return (
    <>
      <SignupNavbar />
      <div className="signup3">
        <h1>Accout Create Successfully</h1>
        <Link to="/">To Home</Link>
      </div>
    </>
  );
};

export default Signup3;
