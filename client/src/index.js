import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Post from "./components/views/PostPage/post";
import Home from "./components/views/LandingPage/landing";
import Register from "./components/views/RegisterPage/register";
import Login from "./components/views/LoginPage/login";
import { Router } from "@reach/router";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Home path="/" />
      <Post path="/post" />
      <Register path="/register" />
      <Login path="/login" />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
