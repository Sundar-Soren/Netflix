import React from "react";
import "./signup1.scss";
import SignupNavbar from "./SignupNavbar";

const Signup1 = () => {
  return (
    <>
      <SignupNavbar />
      <div className="signup1">
        <div className="signup1-container">
          <div>
            <span>STEP 1 OF 3</span>
            <h2>Create a password to start your membership</h2>
            <p>
              Just a few more steps and you're done! We hate paperwork, too.
            </p>
            <div>
              <input type="email" name="" id="" placeholder="email" />
              <input
                type="password"
                name=""
                id=""
                placeholder="Add a password"
              />
              <button>Next</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup1;
