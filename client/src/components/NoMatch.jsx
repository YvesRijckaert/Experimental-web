import React from "react";
import { Link } from "react-router-dom";

import Line from "../components/Line";

const NoMatch = () => (
  <React.Fragment>
    <div className="decolines">
      <Line pos="vertical" top="15" right="15" />
      <Line pos="horizontal" top="15" right="15" />
      <Line pos="horizontal" top="85" right="0" />
    </div>
    <section className="main nomatch">
      <h2 className="subtitle login-subtitle">404, this page doesn't exist!</h2>
      <Link to="/">Take me home</Link>
    </section>
  </React.Fragment>
);

export default NoMatch;
