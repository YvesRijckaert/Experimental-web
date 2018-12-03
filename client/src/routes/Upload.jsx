import React from "react";
import { Link } from "react-router-dom";
import Ml from "../components/Ml";

const Upload = ({ accessToken, image }) => {
  return (
    <section className="upload">
      <h2>Upload to Spotify</h2>
      <Ml image={image} />
      <Link to={`/create?access_token=${accessToken}`}>← Previous</Link>
    </section>
  );
};

export default Upload;
