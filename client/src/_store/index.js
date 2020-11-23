import { applyMiddleware, createStore } from "redux";
import Reducers from "../_reducers";
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";

const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware,
  ReduxThunk
)(createStore);

// const initialState = {
//   auth: {
//     loggedIn: true,
//     userId: "randomid",
//     username: "haneul",
//     email: "goodnavy@naver.com",
//   },
// };

const store = createStoreWithMiddleware(
  Reducers,
  // initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
