import axios from "axios";
import { LOGIN_USER, REGISTER_USER, AUTH_USER, LOGOUT_USER } from "./types";
import { delExp, AUTH_KEY } from "../util/auth";

const baseUrl = `http://localhost:5000`;

export function registerUser(body) {
  const request = axios.post(`${baseUrl}/api/register`, body).then((res) => {
    return res.data;
  });

  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function loginUser(dataToSubmit) {
  const request = axios
    .post(`${baseUrl}/api/login`, dataToSubmit)
    .then((res) => res.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function logOutUser() {
  const request = axios.post(`${baseUrl}/api/logout`).then((res) => res.data);

  delExp(AUTH_KEY);

  return {
    type: LOGOUT_USER,
    payload: request,
  };
}

export function auth() {
  const request = axios.get(`${baseUrl}/api/auth`).then((res) => res.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
}
