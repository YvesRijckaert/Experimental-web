import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App";
import { BrowserRouter } from "react-router-dom";
import WebfontLoader from "@dr-kobros/react-webfont-loader";

import druktext from "./assets/fonts/druktext/druktext.css";
import hkgothic from "./assets/fonts/hkgothic/hkgothic.css";
import cooper from "./assets/fonts/cooper/cooper.css";

const config = {
  custom: {
    families: ["druktext", "hkgothic", "cooper"],
    urls: [druktext, hkgothic, cooper]
  }
};

ReactDOM.render(
  <BrowserRouter>
    <WebfontLoader config={config}>
      <App />
    </WebfontLoader>
  </BrowserRouter>,
  document.getElementById("app")
);
