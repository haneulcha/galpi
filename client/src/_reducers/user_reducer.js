import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  GET_USER,
  GET_DASHBOARD,
} from "../_actions/types";

export default function (state = {}, action) {
  switch (action.type) {
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

    case GET_USER:
      return {
        ...state,
        getUserSuccess: action.payload.message,
      };

    case GET_DASHBOARD:
      return {
        ...state,
        getDashboardSuccess: action.payload.message,
      };
    case AUTH_USER:
      return {
        ...state,
        loggedIn: action.payload.isAuth,
        userId: action.payload.user._id,
        username: action.payload.user.username,
        email: action.payload.user.email,
      };

    default:
      return state;
  }
}
