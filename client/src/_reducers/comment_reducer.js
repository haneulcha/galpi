import { GET_COMMENT, POST_COMMENT, DELETE_COMMENT } from "../_actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case GET_COMMENT:
      return {
        ...state,
        getCommentSuccess: action.payload.message,
      };

    case POST_COMMENT:
      return {
        ...state,
        postCommentSuccess: action.payload.message,
      };

    case DELETE_COMMENT:
      return {
        ...state,
        deleteComomentSuccess: action.payload.message,
      };

    default:
      return state;
  }
}
