import React from "react";
import { Link } from "react-router-dom";
import { UserConsumer } from "../context/UserContext";

const StepFour = () => (
  <UserConsumer>
    {context => {
      return (
        <section className="stepFour">
          <h1>Welcome {context.userName}</h1>
          <h2>Step04 - Upload to Spotify</h2>
          <Link to={`/stepThree?access_token=${context.accessToken}`}>
            Previous
          </Link>
        </section>
      );
    }}
  </UserConsumer>
);

export default StepFour;
