import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../../context/action/userAction";
import "./signup1.scss";
import SignupNavbar from "./SignupNavbar";

const Signup1 = ({ onNext }) => {
  const { email } = useSelector((state) => state.email);
  const dispatch = useDispatch();
  const [email1, setEmail1] = useState(email);
  const [password, setPassword] = useState("");

  const handleClick = () => {
    dispatch(register(email1, password));
    onNext();
  };

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
              <input
                type="email"
                defaultValue={email}
                onChange={(e) => setEmail1(e.target.value)}
                placeholder="email"
              />
              <input
                type="password"
                name=""
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Add a password"
              />
              <button onClick={handleClick}>Next</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup1;
