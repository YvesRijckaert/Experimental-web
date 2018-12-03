import React from "react";

const StyleHandlers = ({onClick}) => {
  const handleClick = e => {
    const { value } = e.currentTarget;
    onClick(value);
  };
  return (
    <React.Fragment>
      <input type="button" value="red" onClick={handleClick} />
      <input type="button" value="green" onClick={handleClick} />
      <input type="button" value="blue" onClick={handleClick}/>
    </React.Fragment>
  );
};

export default StyleHandlers;
