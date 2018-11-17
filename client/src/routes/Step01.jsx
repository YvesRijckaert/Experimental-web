import React from "react";
import { Link } from "react-router-dom";

const Step01 = () => {
//   const temp = () => {
//     <ul>
//       {this.state.playlists.map(playlist => (
//         <li key={playlist.id}>{playlist.name}</li>
//       ))}
//     </ul>;
//   };
  return (
    <section className="step01">
      <h1>Welcome</h1>
      <h2>Step01: Choose one of your playlists to create the artwork:</h2>
      <Link className="link" to="/step02">
        To step 02
      </Link>
    </section>
  );
};

export default Step01;
