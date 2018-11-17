import React from "react";
import { Link } from "react-router-dom";
import { UserConsumer } from "../context/UserContext";

//     <ul>
//       {this.state.playlists.map(playlist => (
//         <li key={playlist.id}>{playlist.name}</li>
//       ))}
//     </ul>;

const Step01 = () => (
  <UserConsumer>
    {context => {
      return (
        <section className="step01">
          <h1>Welcome {context.userName}</h1>
          <h2>Step01: Choose one of your playlists to create the artwork:</h2>
          <Link className="link" to={`/step02?access_token=${context.accessToken}`}>
            To step 02
          </Link>
        </section>
      );
    }}
  </UserConsumer>
);

export default Step01;
