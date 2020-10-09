import { CONTENT_POST, IMG_POST } from "../_actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case IMG_POST:
      return {
        ...state,
        imgurl: action.payload.url,
      };

    case CONTENT_POST:
      return {
        ...state,
        postUploadSuccess: action.payload.message,
      };

    default:
      return state;
  }
}
