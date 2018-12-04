import React from "react";
import Line from "./Line";

const Lines = () => (
  <div className="decolines">
    <Line pos="vertical" top="15" right="15" />
    <Line pos="horizontal" top="15" right="15" />
    <Line pos="horizontal" top="85" right="0" />
  </div>
);

export default Lines;
