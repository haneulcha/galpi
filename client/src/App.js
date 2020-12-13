import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import {
  Dashboard,
  ErrorModal,
  Footer,
  Home,
  LandingPage,
  Login,
  NavBar,
  NotFound,
  Posting,
  Post,
  Profile,
  Register,
  Thumbnails,
} from "./components/views/index";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { GuestRoute, AuthRoute } from "./route/index";
import { auth } from "./_actions/user_action";
import { errorHandle } from "./_actions/error_actions";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        await dispatch(auth());
      } catch (e) {
        dispatch(errorHandle(e.response));
      }
    };
    fetchAuth();
  }, [dispatch]);

  return (
    <>
      <Router>
        <NavBar>
          <section className="body-container">
            <Switch>
              <GuestRoute exact path="/" component={LandingPage} />

              <GuestRoute path="/login" component={Login} />
              <GuestRoute path="/register" component={Register} />

              <AuthRoute path="/dashboard" component={Dashboard} />
              <AuthRoute path="/home" component={Home} />
              <AuthRoute path="/post" component={Posting} />

              <Route path="/thumbnails" component={Thumbnails} />
              <Route path="/user/:username" children={<Profile />} />
              <Route path="/p/:uuid" children={<Post />} />

              <Route component={NotFound} />
            </Switch>
          </section>
        </NavBar>
      </Router>
      <Footer />
      <ErrorModal />
    </>
  );
};

export default App;
