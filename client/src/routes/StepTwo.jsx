import React from "react";
import { Link } from "react-router-dom";
import Canvas from "../components/Canvas";
import { UserConsumer } from "../context/UserContext";

const StepTwo = ({textToRender}) => (
  <UserConsumer>
    {context => {
      return (
        <section className="stepTwo">
          <h1>Welcome {context.userName}</h1>
          <h2>Step02</h2>
          <Canvas textToRender={textToRender} />
          <Link to={`/?access_token=${context.accessToken}`}>
            Previous
          </Link>
          <Link to={`/stepThree?access_token=${context.accessToken}`}>
            Next
          </Link>
        </section>
      );
    }}
  </UserConsumer>
);

export default StepTwo;
