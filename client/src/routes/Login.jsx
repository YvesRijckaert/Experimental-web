import React from "react";
import Arrow from "../components/Arrow";
import Wave from "../components/Wave";

const Login = ({ onClick }) => {
  const clickButton = e => {
    onClick();
  };
  return (
    <React.Fragment>
      <section className="main login">
        <button className="login-button" onClick={clickButton}>Login</button>
        <Arrow className="login-arr1" />
        <Arrow className="login-arr2" />
        <Wave className="login-wav1" />
        <Wave className="login-wav2" />
        <Wave className="login-wav3" />
      </section>
    </React.Fragment>
  );
};

export default Login;
