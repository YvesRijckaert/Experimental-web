import React from "react";
import { Link } from "react-router-dom";
import { UserConsumer } from "../context/UserContext";

const StepOne = ({ playlists }) => (
  <UserConsumer>
    {context => {
      return (
        <section className="stepOne">
          <h1>Welcome {context.userName}</h1>
          <h2>Step01: Choose one of your playlists to create the artwork:</h2>
          <ul>
            {playlists.map(playlist => (
              <li key={playlist.id}>{playlist.name}</li>
            ))}
          </ul>
          <Link to={`/stepTwo?access_token=${context.accessToken}`}>Next</Link>
        </section>
      );
    }}
  </UserConsumer>
);

export default StepOne;
