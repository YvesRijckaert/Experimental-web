import React from "react";
import Lines from "../components/Lines";

const Login = ({ onClick }) => {
  const clickButton = e => {
    onClick();
  };
  return (
    <React.Fragment>
      <Lines />
      <section className="login">
        <h2>Login to your account</h2>
        <button onClick={clickButton}>Here</button>
      </section>
    </React.Fragment>
  );
};

export default Login;
