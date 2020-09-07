import axios from "axios";
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "./types";

export function registerUser(body) {
  const request = axios.post("/api/users/register", body).then((res) => {
    console.log(res.data); // { success: true/false }
    return res.data;
  });

  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function loginUser(dataToSubmit) {
  const request = axios
    .post("/api/users/login", dataToSubmit)
    .then((res) => res.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

//logout

export function auth() {
  const request = axios.get("/api/users/auth").then((res) => res.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
}
