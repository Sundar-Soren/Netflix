import React, { useState } from "react";
import Signup from "./signup/Signup";
import Signup1 from "./signup/Signup1";
import Signup2 from "./signup/Signup2";
import Signup3 from "./signup/Signup3";

const steps = {
  1: Signup,
  2: Signup1,
  3: Signup2,
  4: Signup3,
};
const Register = () => {
  const [step, setStep] = useState(1);
  const Step = steps[step];
  const onNext = () => {
    setStep(step + 1);
  };
  return (
    <div className="register">
      <Step onNext={onNext} />
    </div>
  );
};

export default Register;
