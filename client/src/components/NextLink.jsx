import React from "react";
import { Link } from "react-router-dom";

const NextLink = ({ accessToken, active, url }) => {
  return active ? (
    <Link className="canvas-done" to={`/${url}?access_token=${accessToken}`}>I'm done</Link>
  ) : (
    <button className="canvas-done canvas-done-disabled" disabled>I'm done</button>
  );
};

export default NextLink;
