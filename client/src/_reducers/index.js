import { combineReducers } from "redux";
import user from "./user_reducer";

const rootReducer = combineReducers({
  auth: user,
});

export default rootReducer;
