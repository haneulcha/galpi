import axios from "axios";
import { CONTENT_POST, IMG_POST, GET_A_POST, GET_POSTS } from "./types";

const baseUrl = `http://localhost:5050`;

export function imgPost(formData) {
  let config = {
    header: {
      "Content-type": "multipart/form-data",
    },
  };
  const request = axios
    .post(`${baseUrl}/api/post/img`, formData, config)
    .then((res) => {
      return res.data;
    });

  return {
    type: IMG_POST,
    payload: request,
  };
}

export function contentPost(data) {
  const request = axios.post(`${baseUrl}/api/post`, data).then((res) => {
    return res.data;
  });

  return {
    type: CONTENT_POST,
    payload: request,
  };
}

export function getAPost(uuid) {
  const request = axios
    .get(`${baseUrl}/api/post/${uuid}`)
    .then((res) => res.data);

  return {
    type: GET_A_POST,
    payload: request,
  };
}

export function getPosts(page, username) {
  if (username) {
    const request = axios.get(
      `${baseUrl}/api/post?username=${username}&page=${page}&limit=10`
    );

    return {
      type: GET_POSTS,
      payload: request,
    };
  } else {
    const request = axios.get(`${baseUrl}/api/post?page=${page}&limit=10`);

    return {
      type: GET_POSTS,
      payload: request,
    };
  }
}
