import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { positions, Provider, transitions } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Home from "./pages/Home";
import Create from "./pages/Create";

const alertOptions = {
  timeout: 5000,
  position: positions.TOP_RIGHT,
  offset: "30px",
  transition: transitions.SCALE,
};

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider template={AlertTemplate} {...alertOptions}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-bookmark" element={<Create />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
