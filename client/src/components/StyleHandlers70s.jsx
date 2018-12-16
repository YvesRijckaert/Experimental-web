import React from "react";

const StyleHandlers70s = ({ onChange }) => {
  const handleChange = e => {
    onChange(e.currentTarget.value);
  };
  return (
    <React.Fragment>
      <div className="create-waves">
        <h3>Waves</h3>
        <input
          type="range"
          min="1"
          max="3"
          defaultValue="1"
          onChange={handleChange}
          step="0.5"
          className="create-slider"
        />
      </div>
    </React.Fragment>
  );
};

export default StyleHandlers70s;
