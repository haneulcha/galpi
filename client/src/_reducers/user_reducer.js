import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH,
  LOGOUT_USER,
  GET_USER,
  GET_DASHBOARD,
} from "../_actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        getRegisterSuccess: action.payload.message,
      };

    case LOGIN_USER:
      return {
        ...state,
        loggedIn: true,
        userId: action.payload.user._id,
        username: action.payload.user.username,
      };

    case LOGOUT_USER:
      return {
        ...state,
        loggedIn: false,
        userId: {},
        username: {},
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
    case AUTH:
      return {
        ...state,
        loggedIn: action.payload.isAuth,
        userId: action.payload.user._id,
        username: action.payload.user.username,
      };

    default:
      return state;
  }
}
