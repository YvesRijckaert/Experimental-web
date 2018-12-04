import React from "react";

const Line = ({ pos, top, right }) => {
  const verticalLineStyle = {
    width: ".3rem",
    height: "100vh",
    right: `${right}%`,
    top: `${top}%`,
    background: "#373737",
    animation: `slideInVertical 1s ease-out`,
    willChange: "transform",
    transformOrigin: `${0}% ${100}% 0rem`,
    transform: "scaleY(1)"
  };

  const horizontalLineStyle = {
    width: "100vw",
    height: ".3rem",
    right: `${right}%`,
    top: `${top}%`,
    background: "#373737",
    animation: `slideInHorizontal 1s ease-out`,
    willChange: "transform",
    transformOrigin: `${0}% ${0}% 0rem`,
    transform: "scaleY(1)"
  };
  return (
    <React.Fragment>
      <div className="decoline" style={pos === 'vertical' ? verticalLineStyle : horizontalLineStyle} />
    </React.Fragment>
  );
};

export default Line;
