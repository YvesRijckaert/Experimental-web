import React from "react";

const StyleHandlers = ({ onChange }) => {
  const handleChange = e => {
    onChange(e.currentTarget.value);
  };
  return (
    <React.Fragment>
      <input
        type="range"
        min="0"
        max="5"
        defaultValue="1"
        onChange={handleChange}
        step="1"
      />
    </React.Fragment>
  );
};

export default StyleHandlers;
