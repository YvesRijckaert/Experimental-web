import React from "react";
import Line from "../components/Line";
import Arrow from "../components/Arrow";
import Wave from "../components/Wave";

const Login = ({ onClick }) => {
  const clickButton = e => {
    onClick();
  };
  return (
    <React.Fragment>
      <div className="decolines">
        <Line pos="horizontal" top="10" right="0" />
        <Line pos="horizontal" top="90" right="0"/>
      </div>
      <section className="main login">
        <button className="login-button" onClick={clickButton}>Here</button>
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
