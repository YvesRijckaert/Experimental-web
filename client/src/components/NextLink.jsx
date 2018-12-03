import React from "react";
import { Link } from "react-router-dom";

const NextLink = ({ accessToken, active, url }) => {
  return active ? (
    <Link to={`/${url}?access_token=${accessToken}`}>Next →</Link>
  ) : (
    <button disabled>Next →</button>
  );
};

export default NextLink;
