import axios from "axios";
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH,
  LOGOUT_USER,
  GET_USER,
  GET_DASHBOARD,
} from "./types";

export function registerUser(body) {
  const request = axios
    .post(`/api/user`, body)
    .then((res) => res.data)
    .catch((e) => console.log(e));

  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function loginUser(dataToSubmit) {
  const request = axios
    .post(`/api/login`, dataToSubmit)
    .then((res) => res.data)
    .catch((e) => console.log(e));

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function logOutUser() {
  const request = axios
    .post(`/api/logout`)
    .then((res) => res.data)
    .catch((e) => console.log(e));

  return {
    type: LOGOUT_USER,
    payload: request,
  };
}

export async function getUser(username) {
  const request = await axios
    .get(`/api/user/${username}`)
    .then((res) => res.data)
    .catch((e) => console.log(e));

  return {
    type: GET_USER,
    payload: request,
  };
}

export function getDashboard() {
  const request = axios
    .get(`/api/dashboard`)
    .then((res) => res.data)
    .catch((e) => console.log(e));

  return {
    type: GET_DASHBOARD,
    payload: request,
  };
}

export async function auth() {
  const request = await axios
    .get(`/api/auth`)
    .then((res) => res.data)
    .catch((e) => console.log(e));

  console.log(request);
  const { isAuth } = request;

  if (isAuth) {
    const { _id = null, username = null, email = null } = request.user;
    return {
      type: AUTH,
      payload: {
        isAuth,
        _id,
        username,
        email,
      },
    };
  }

  return {
    type: AUTH,
    payload: request,
  };
}
