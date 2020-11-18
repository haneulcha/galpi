import { POST_LIKE, POST_UNLIKE } from "../_actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case POST_LIKE:
      return {
        ...state,
        getLikeSuccess: action.payload.message,
      };

    case POST_UNLIKE:
      return {
        ...state,
        postUnlikeSuccess: action.payload.message,
      };

    default:
      return state;
  }
}
