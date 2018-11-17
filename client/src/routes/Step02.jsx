import React from "react";
import { Link } from "react-router-dom";
import Canvas from "../components/Canvas";
import { UserConsumer } from "../context/UserContext";

const Step02 = () => (
  <UserConsumer>
    {context => {
      return (
        <section className="step02">
          <h1>Welcome {context.userName}</h1>
          <h2>Step02</h2>
          <Canvas />
          <Link className="link" to={`/step03?access_token=${context.accessToken}`}>
            To step 03
          </Link>
        </section>
      );
    }}
  </UserConsumer>
);

export default Step02;

