import React from "react";
import { Link, Redirect } from "react-router-dom";

import Ml from "../components/Ml";
import CoverUploader from "../components/CoverUploader";

const Upload = ({ accessToken, image, playlist_id }) => {
  return image === "" ? (
    <Redirect to="/create" />
  ) : (
    <section className="upload">
      <h2>Upload to Spotify</h2>
      <Ml image={image} />
      <CoverUploader image={image} accessToken={accessToken} playlist_id={playlist_id} />
      <Link to={`/create?access_token=${accessToken}`}>← Previous</Link>
    </section>
  );
};

export default Upload;
