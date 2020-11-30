import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
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
import { auth } from "./_actions/user_action";
import { errorHandle } from "./_actions/error_actions";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAuth = async () => {
      console.log("initial auth");

      try {
        await dispatch(auth());
      } catch (e) {
        dispatch(errorHandle(e));
      }
    };

    fetchAuth();
  }, [dispatch]);

  return (
    <Router>
      <Switch>
        <NavBar>
          <section className="body-container">
            <GuestRoute path="/login" component={Login} />
            <GuestRoute path="/register" component={Register} />

            <AuthRoute path="/dashboard" component={Dashboard} />
            <AuthRoute path="/home" component={Home} />
            <AuthRoute path="/post" component={Posting} />

            <Route path="/user/:username" children={<Profile />} />
            <Route path="/p/:uuid" children={<Post />} />
            <GuestRoute exact path="/" component={LandingPage} />

            {/* <Route component={NotFound} />      */}
          </section>
        </NavBar>
      </Switch>
    </Router>
  );
};

export default App;
