import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "../_actions/types";

export default function (state = {}, action) {
  console.log("state", state);
  console.log("action", action);
  switch (
    action.type // key 자리에 type
  ) {
    case REGISTER_USER:
      return { ...state, register: action.payload };

    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };

    case AUTH_USER:
      return { ...state, userData: action.payload };

    default:
      return state;
  }
}
