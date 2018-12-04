import React from "react";
import Line from "../components/Line";

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
      <section className="login">
        <h2>Login to your account</h2>
        <button onClick={clickButton}>Here</button>
      </section>
    </React.Fragment>
  );
};

export default Login;
