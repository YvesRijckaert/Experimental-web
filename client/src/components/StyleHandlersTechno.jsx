import React from "react";

const StyleHandlersTechno = ({ onClick, selectedColor }) => {
  const handleClick = e => {
    onClick(e.currentTarget);
  };
  return (
    <div className="canvas-options-color">
      <h3 className="canvas-option-title">Colour</h3>
      <div className="canvas-option-colorwrap">
        <button
          data-rgb="5.0, 0.0, 0.0"
          data-colour="red"
          onClick={handleClick}
          className={selectedColor === "red" ? 'canvas-option-color canvas-option-color-active' : 'canvas-option-color'}
          id="canvas-option-color-red"
        />
        <button
          data-rgb="0.0, 0.0, 5.0"
          data-colour="blue"
          onClick={handleClick}
          className={selectedColor === "blue" ? 'canvas-option-color canvas-option-color-active' : 'canvas-option-color'}
          id="canvas-option-color-blue"
        />
        <button
          data-rgb="0.0, 5.0, 0.0"
          data-colour="green"
          onClick={handleClick}
          className={selectedColor === "green" ? 'canvas-option-color canvas-option-color-active' : 'canvas-option-color'}
          id="canvas-option-color-green"
        />
      </div>
    </div>
  );
};

export default StyleHandlersTechno;
