import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvidier from "./context/auth-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvidier>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthContextProvidier>
);
