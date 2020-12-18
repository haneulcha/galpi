import axios from "axios";
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH,
  LOGOUT_USER,
  GET_USER,
  GET_DASHBOARD,
  DELETE_USER,
} from "./types";
axios.defaults.withCredentials = true;

export async function registerUser(body) {
  let response = await axios.post(`/api/user`, body);

  return {
    type: REGISTER_USER,
    payload: response.data,
  };
}

export async function loginUser(dataToSubmit) {
  let response = await axios.post(`/api/login`, dataToSubmit);

  return {
    type: LOGIN_USER,
    payload: response.data,
  };
}

export async function logOutUser() {
  let response = await axios.post(`/api/logout`);

  return {
    type: LOGOUT_USER,
    payload: response.data,
  };
}

export async function getUser(username) {
  let response = await axios.get(`/api/user/${username}`);

  return {
    type: GET_USER,
    payload: response.data,
  };
}

export async function deleteUser(pwd) {
  let response = await axios.delete(`api/user`, { data: pwd });

  return {
    type: DELETE_USER,
    payload: response.data,
  };
}

export async function getDashboard() {
  let response = await axios.get(`/api/dashboard`);

  return {
    type: GET_DASHBOARD,
    payload: response.data,
  };
}

export async function auth() {
  let response = await axios.get(`/api/auth`);

  return {
    type: AUTH,
    payload: response.data,
  };
}
