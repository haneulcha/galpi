import React from "react";
import "./index.css";
import Post from "./components/views/PostPage/post";
import LandingPage from "./components/views/LandingPage/landing";
import Register from "./components/views/RegisterPage/register";
import Login from "./components/views/LoginPage/login";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NavBar from "./components/views/NavBar/_navBar";
import Auth from "./hoc/auth";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Auth(LandingPage, null)} />
        <Route exact path="/post" component={Auth(Post, true)} />
        <Route exact path="/users/register" component={Auth(Register, false)} />
        <Route exact path="/users/login" component={Auth(Login, false)} />
      </Switch>
    </Router>
  );
};

export default App;
