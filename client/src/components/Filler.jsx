import React from "react";

const Filler = ({ percentage }) => (
  <div className="filler" style={{ width: `${percentage}%` }} />
);

export default Filler;
