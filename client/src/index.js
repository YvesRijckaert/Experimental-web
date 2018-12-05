import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App";
import { BrowserRouter } from "react-router-dom";
import WebfontLoader from "@dr-kobros/react-webfont-loader";

import druktext from "./assets/fonts/druktext/druktext.css";
import hkgothic from "./assets/fonts/hkgothic/hkgothic.css";

const config = {
  custom: {
    families: ["druktext", "hkgothic"],
    urls: [druktext, hkgothic]
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
