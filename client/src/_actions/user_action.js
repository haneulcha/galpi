import axios from "axios";
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  GET_USER,
  GET_DASHBOARD,
} from "./types";

const baseUrl = `http://localhost:5050/api`;

export function registerUser(body) {
  const request = axios
    .post(`${baseUrl}/user`, body)
    .then((res) => {
      return res.data;
    })
    .catch((e) => console.log(e));

  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function loginUser(dataToSubmit) {
  const request = axios
    .post(`${baseUrl}/login`, dataToSubmit)
    .then((res) => res.data)
    .catch((e) => console.log(e));

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function logOutUser() {
  const request = axios
    .post(`${baseUrl}/logout`)
    .then((res) => res.data)
    .catch((e) => console.log(e));

  return {
    type: LOGOUT_USER,
    payload: request,
  };
}

export function getUser(username) {
  const request = axios
    .get(`${baseUrl}/user/${username}`)
    .then((res) => res.data)
    .catch((e) => console.log(e));

  return {
    type: GET_USER,
    payload: request,
  };
}

export function getDashboard() {
  const request = axios
    .get(`${baseUrl}/dashboard`)
    .then((res) => res.data)
    .catch((e) => console.log(e));

  return {
    type: GET_DASHBOARD,
    payload: request,
  };
}

export function auth() {
  const request = axios
    .get(`${baseUrl}/auth`)
    .then((res) => res.data)
    .catch((e) => console.log(e));

  return {
    type: AUTH_USER,
    payload: request,
  };
}
