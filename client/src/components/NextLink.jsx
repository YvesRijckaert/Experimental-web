import React from "react";
import { Link } from "react-router-dom";

const NextLink = ({ accessToken, active, url }) => {
  return active ? (
    <Link className="canvas-done" to={`/${url}?access_token=${accessToken}`}>Next →</Link>
  ) : (
    <button className="canvas-done" disabled>Next →</button>
  );
};

export default NextLink;
