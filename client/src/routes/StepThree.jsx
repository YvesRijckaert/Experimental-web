import React from "react";
import { Link } from "react-router-dom";
import Ml from "../components/Ml";
import { UserConsumer } from "../context/UserContext";

const StepThree = () => (
  <UserConsumer>
    {context => {
      return (
        <section className="StepThree">
          <h1>Welcome {context.userName}</h1>
          <h2>Step03 - Add Machine Learning</h2>
          <Ml />
          <Link to={`/stepTwo?access_token=${context.accessToken}`}>
            Previous
          </Link>
          <Link to={`/stepFour?access_token=${context.accessToken}`}>
          Next
        </Link>
        </section>
      );
    }}
  </UserConsumer>
);

export default StepThree;
