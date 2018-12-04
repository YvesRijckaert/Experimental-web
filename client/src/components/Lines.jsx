import React from "react";

const style1 = {
  width: ".3rem",
  height: "100vh",
  right: "20%",
  top: "15%",
  background: "#373737",
  opacity: "1",
  animation: `slidein 1s ease-out`,
  transformOrigin: `${0}% ${100}% 0rem`,
  transform: "scaleY(1)"
};

const style2 = {
  width: "100vw",
  height: ".3rem",
  right: "20%",
  top: "15%",
  background: "#373737",
  opacity: "1",
  transformOrigin: `${50}% ${0}% 0rem`,
  transform: "scaleY(1)"
};

const Lines = ({ percentage }) => (
  <div className="decolines">
    <div className="decoline" style={style1} />
    <div className="decoline" style={style2} />
  </div>
);

export default Lines;
