import React from "react";
import "./index.css";
import {
  Register,
  Login,
  Dashboard,
  Home,
  Post,
  Posting,
  Profile,
  LandingPage,
} from "./components/views/index";
// import NotFound from './components/views/NotFound/notFound'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/views/NavBar/navbar";
import { GuestRoute, AuthRoute } from "./route/index";
// import Auth from "./hoc/auth";

const App = () => {
  return (
    <Router>
      <Switch>
        <NavBar>
          <div className="body">
            <GuestRoute path="/login" component={Login} />
            <GuestRoute path="/register" component={Register} />

            <AuthRoute path="/dashboard" component={Dashboard} />
            <AuthRoute path="/home" component={Home} />
            <AuthRoute path="/post" component={Posting} />

            <Route path="/user/:username" children={<Profile />} />
            <Route path="/p/:uuid" children={<Post />} />
            <Route exact path="/" component={LandingPage} />

            {/* <Route component={NotFound} />      */}
          </div>
        </NavBar>
      </Switch>
    </Router>
  );
};

export default App;