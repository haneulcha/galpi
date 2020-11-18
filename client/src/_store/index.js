import { applyMiddleware, createStore } from "redux";
import { AUTH_KEY, getExp } from "../util/auth";
import Reducers from "../_reducers";
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";

const loginStatus = () => {
  console.log("initial authentication confirm");
  if (getExp(AUTH_KEY)) {
    return true;
  }
  return false;
};

const loginDetail = () => {
  return getExp(AUTH_KEY) ? getExp(AUTH_KEY) : { userId: null, username: null };
};

const initialStates = {
  auth: {
    loggedIn: loginStatus(),
    userId: loginDetail().userId,
    username: loginDetail().username,
  },
};

const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware,
  ReduxThunk
)(createStore);

const store = createStoreWithMiddleware(
  Reducers,
  initialStates,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
