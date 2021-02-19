import React from "react";
import { render } from "react-dom";
import { Link, Router } from "@reach/router";
import MainPage from "./MainPage.js";
import ReporteServicio from "./ReporteServicio.js";
import CalculoHoras from "./CalculoHoras.js";

const App = () => {
  return (
    <React.StrictMode>
      <div id="my-app">
        <Link to="/" className="logo-link">
          <img
            src={require("./logo.png")}
            width="250"
            height="250"
            alt="logo IAS"
            className="logo"
          />
        </Link>
        <Router>
          <MainPage path="/" />
          <ReporteServicio path="/servicio" />
          <CalculoHoras path="calculo" />
        </Router>
      </div>
    </React.StrictMode>
  );
};

render(<App />, document.getElementById("root"));
