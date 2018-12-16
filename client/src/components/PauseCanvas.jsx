import React from "react";

const PauseCanvas = ({ paused, onClick }) => {
  const handleClickPause = (e) => {
    const value = e.currentTarget;
    onClick(value);
  }
  return paused ? (
    <button className="canvas-play" onClick={handleClickPause} data-info="play">
      Play
    </button>
  ) : (
    <button className="canvas-pause" onClick={handleClickPause} data-info="pause">
      Pause
    </button>
  );
};

export default PauseCanvas;
