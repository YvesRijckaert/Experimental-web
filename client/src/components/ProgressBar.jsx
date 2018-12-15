import React from "react";
import Line from "../components/Line";

const ProgressBar = ({percentage}) => (
  <div className="progress-bar">
    <div className="decolines">
      <Line pos="horizontal" top="10" right="0" />
      <Line pos="horizontal" top="20" right="0" />
    </div>
    <div className="filler" style={{ width: `${percentage}%` }} />
    <ol className="progress-bar-content">
      <li>
        <p>Login to Spotify</p>
      </li>
      <li>
        <p>Choose a playlist</p>
      </li>
      <li>
        <p>Choose a genre</p>
      </li>
      <li>
        <p>Create the art</p>
      </li>
      <li>
        <p>Upload or share</p>
      </li>
    </ol>
  </div>
);

export default ProgressBar;
