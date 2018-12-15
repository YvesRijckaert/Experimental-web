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
        Login to Spotify
      </li>
      <li>
        Choose a playlist
      </li>
      <li>
        Choose a genre
      </li>
      <li>
        Create the art
      </li>
      <li>
        Upload or share
      </li>
    </ol>
  </div>
);

export default ProgressBar;
