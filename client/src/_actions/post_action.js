import axios from "axios";
import { CONTENT_POST, IMG_POST, GET_A_POST, GET_POSTS } from "./types";

export function imgPost(formData) {
  let config = {
    header: {
      "Content-type": "multipart/form-data",
    },
  };
  const request = axios
    .post(`/api/post/img`, formData, config)
    .then((res) => res.data)
    .catch((e) => console.log(e));

  return {
    type: IMG_POST,
    payload: request,
  };
}

export function contentPost(data) {
  const request = axios
    .post(`/api/post`, data)
    .then((res) => res.data)
    .catch((e) => console.log(e));

  return {
    type: CONTENT_POST,
    payload: request,
  };
}

export function getAPost(uuid) {
  const request = axios
    .get(`/api/post/${uuid}`)
    .then((res) => res.data)
    .catch((e) => console.log(e));

  return {
    type: GET_A_POST,
    payload: request,
  };
}

export function getPosts(page, username) {
  if (username) {
    const request = axios
      .get(`/api/post?username=${username}&page=${page}&limit=10`)
      .then((res) => res)
      .catch((e) => console.log(e));

    return {
      type: GET_POSTS,
      payload: request,
    };
  }
  const request = axios
    .get(`/api/post?page=${page}&limit=10`)
    .then((res) => res)
    .catch((e) => console.log(e));

  return {
    type: GET_POSTS,
    payload: request,
  };
}
