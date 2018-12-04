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
        <Line pos="vertical" top="15" right="15" />
        <Line pos="horizontal" top="15" right="15" />
        <Line pos="horizontal" top="85" right="0" />
      </div>
      <section className="main login">
        <h2 className="subtitle login-subtitle">Login to your account</h2>
        <button className="login-button" onClick={clickButton}>Here</button>
        <Arrow className="login-arr1" />
        <Arrow className="login-arr2" />
        <Wave className="login-wav1" />
        <Wave className="login-wav2" />
      </section>
    </React.Fragment>
  );
};

export default Login;
