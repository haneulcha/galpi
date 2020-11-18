import { combineReducers } from "redux";
import user from "./user_reducer";
import post from "./post_reducer";
import comment from "./comment_reducer";
import like from "./like_reducer";

const rootReducer = combineReducers({
  auth: user,
  post,
  comment,
  like,
});

export default rootReducer;
