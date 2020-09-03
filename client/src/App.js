import React from "react";
import "./index.css";
import Post from "./components/views/PostPage/post";
import Home from "./components/views/LandingPage/landing";
import Register from "./components/views/RegisterPage/register";
import Login from "./components/views/LoginPage/login";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NavBar from "./components/views/NavBar/navbar";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Home exact path="/" />
        <Post exact path="/post" />
        <Register exact path="/users/register" />
        <Login exact path="/users/login" />
      </Switch>
    </Router>
  );
};

export default App;
