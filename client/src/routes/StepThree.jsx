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
          <h2>Step03</h2>
          <Ml />
          <Link to={`/stepTwo?access_token=${context.accessToken}`}>
            Previous
          </Link>
        </section>
      );
    }}
  </UserConsumer>
);

export default StepThree;
