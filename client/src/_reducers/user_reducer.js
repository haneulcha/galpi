import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
} from "../_actions/types";

export default function (state = {}, action) {
  console.log("state", state);
  console.log("action", action);
  switch (
    action.type // key 자리에 type
  ) {
    case REGISTER_USER:
      return {
        ...state,
        loggedIn: true,
        userId: action.payload.userId,
        username: action.payload.username,
        register: action.payload.message,
      };

    case LOGIN_USER:
      return {
        ...state,
        loggedIn: true,
        userId: action.payload.userId,
        username: action.payload.username,
        login: action.payload.message,
      };

    case LOGOUT_USER:
      return {
        ...state,
        loggedIn: false,
        userId: {},
        username: {},
        logout: action.payload.message,
      };

    case AUTH_USER:
      return { ...state, userData: action.payload };

    default:
      return state;
  }
}
