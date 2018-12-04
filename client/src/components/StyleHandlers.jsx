import React from "react";

const StyleHandlers = ({onClick}) => {
  const handleClick = e => {
    onClick(e.currentTarget);
  };
  return (
    <React.Fragment>
      <input type="button" value="red" data-rgb="5.0, 0.0, 0.0" onClick={handleClick} />
      <input type="button" value="green" data-rgb="0.0, 5.0, 0.0" onClick={handleClick} />
      <input type="button" value="blue" data-rgb="0.0, 0.0, 5.0" onClick={handleClick}/>
    </React.Fragment>
  );
};

export default StyleHandlers;
