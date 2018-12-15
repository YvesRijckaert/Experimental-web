import React from "react";

const StyleHandlers = ({ onClick }) => {
  const handleClick = e => {
    onClick(e.currentTarget);
  };
  return (
    <div className="canvas-options-color">
      <p>Color</p>
      <input
        type="button"
        data-rgb="5.0, 0.0, 0.0"
        onClick={handleClick}
        className="canvas-option-color"
        id="canvas-option-color-red"
      />
      <input
        type="button"
        data-rgb="0.0, 0.0, 5.0"
        onClick={handleClick}
        className="canvas-option-color"
        id="canvas-option-color-blue"
      />
      <input
        type="button"
        data-rgb="0.0, 5.0, 0.0"
        onClick={handleClick}
        className="canvas-option-color"
        id="canvas-option-color-green"
      />
    </div>
  );
};

export default StyleHandlers;
