import { combineReducers } from "redux";
import user from "./user_reducer";
import post from "./post_reducer";
import comment from "./comment_reducer";
import like from "./like_reducer";
import error from "./error_reducer";

const rootReducer = combineReducers({
  user,
  post,
  comment,
  like,
  error,
});

export default rootReducer;
