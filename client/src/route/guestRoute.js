import { Route, Redirect } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";

export const GuestRoute = ({ component: Component, ...rest }) => {
  const { loggedIn } = useSelector((state) => ({
    loggedIn: state.auth.loggedIn,
  }));

  return (
    <Route
      {...rest}
      render={(props) =>
        !loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/home", state: { from: props.location } }}
          />
        )
      }
    />
  );
};
