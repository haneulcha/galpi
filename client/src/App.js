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
  Footer,
} from "./components/views/index";
import NotFound from "./components/views/NotFound/notFound";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/views/NavBar/navbar";
import { GuestRoute, AuthRoute } from "./route/index";
import { auth } from "./_actions/user_action";
import { errorHandle } from "./_actions/error_actions";
import ErrorModal from "./components/views/Modal/modal-content";

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
