import { CheckCircleOutlineOutlined, DoneOutlined } from "@material-ui/icons";
import React from "react";
import "./signup2.scss";
import SignupNavbar from "./SignupNavbar";

const Signup2 = ({ onNext }) => {
  return (
    <>
      <SignupNavbar />
      <div className="signup2">
        <div>
          <div className="first-signup2-div">
            <CheckCircleOutlineOutlined className="signup2-Icon done-icon" />
            <span>STEP 2 OF 3</span>
            <h3>Choose your plan.</h3>
          </div>
          <div className="second-signup-div">
            <DoneOutlined className="signup2-Icon" />
            <span>No commitments, cancel anytime.</span>
          </div>
          <div className="second-signup-div">
            <DoneOutlined className="signup2-Icon" />
            <span>Everything on Netflix for one low price.</span>
          </div>
          <div className="second-signup-div">
            <DoneOutlined className="signup2-Icon" />
            <span>No ads and no extra fees. Ever.</span>
          </div>
          <button onClick={onNext}>Next</button>
        </div>
      </div>
    </>
  );
};

export default Signup2;
