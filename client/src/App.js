import React from "react";
import "./index.css";
import Post from "./components/views/PostPage/post";
import LandingPage from "./components/views/LandingPage/landing";
import Register from "./components/views/RegisterPage/register";
import Login from "./components/views/LoginPage/login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import NavBar from "./components/views/NavBar/_navBar";
// import Auth from "./hoc/auth";

const App = () => {
  return (
    <Router>
      {/* <NavBar /> */}
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/post" component={Post} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </Router>
  );
};

export default App;
