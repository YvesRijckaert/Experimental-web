import React from "react";

const style1 = {
  width: ".3rem",
  height: "100vh",
  right: "15%",
  top: "15%",
  background: "#373737",
  opacity: "1",
  animation: `slideInVertical 1s cubic-bezier(0.215, 0.610, 0.355, 1.000)`,
  transformOrigin: `${0}% ${100}% 0rem`,
  transform: "scaleY(1)"
};

const style2 = {
  width: "100vw",
  height: ".3rem",
  right: "15%",
  top: "15%",
  background: "#373737",
  opacity: "1",
  animation: `slideInHorizontal 1s cubic-bezier(0.215, 0.610, 0.355, 1.000)`,
  transformOrigin: `${0}% ${0}% 0rem`,
  transform: "scaleY(1)"
};

const style3 = {
    width: "100vw",
    height: ".3rem",
    right: "0%",
    bottom: "15%",
    background: "#373737",
    opacity: "1",
    animation: `slideInHorizontal 1s cubic-bezier(0.215, 0.610, 0.355, 1.000)`,
    transformOrigin: `${0}% ${0}% 0rem`,
    transform: "scaleY(1)"
  };

const Lines = ({ percentage }) => (
  <div className="decolines">
    <div className="decoline" style={style1} />
    <div className="decoline" style={style2} />
    <div className="decoline" style={style3} />
  </div>
);

export default Lines;
