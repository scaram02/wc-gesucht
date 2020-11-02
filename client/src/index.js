import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css"; // npm install boostrap
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

// using this just to tell us if the user is loggedin or not

axios.get("/api/auth/loggedin").then(response => {
  const user = response.data;

  ReactDOM.render(
    <BrowserRouter>
      <App user={user} />
    </BrowserRouter>,
    document.getElementById("root")
  );
}).catch(err => err);
;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
