import React from "react";
import { Link } from "react-router-dom";
import Canvas from "../components/Canvas";

const Step02 = () => {
  return (
    <section className="step01">
      <h1>Welcome</h1>
      <h2>Step02</h2>
      <Canvas />
      <Link className="link" to="/step03">
        To step 03
      </Link>
    </section>
  );
};

export default Step02;
