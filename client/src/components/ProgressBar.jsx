import React from "react";

const ProgressBar = ({percentage}) => (
  <div className="progress-bar">
    <div className="filler" style={{ height: `${percentage}%` }} />
  </div>
);

export default ProgressBar;
