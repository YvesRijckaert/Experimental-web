import React from "react";

const Login = ({ onClick }) => {
  const clickButton = e => {
    onClick();
  };
  return (
    <section className="login">
      <h2>Login to your account</h2>
      <button onClick={clickButton}>Here</button>
    </section>
  );
};

export default Login;
