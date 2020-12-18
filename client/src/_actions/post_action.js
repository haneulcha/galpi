import axios from "axios";

import {
  CONTENT_POST,
  IMG_POST,
  GET_A_POST,
  GET_POSTS,
  DELETE_POST,
} from "./types";

axios.defaults.withCredentials = true;

export async function imgPost(formData) {
  const config = {
    header: {
      "Content-type": "multipart/form-data",
    },
  };

  const response = await axios.post(`/api/post/img`, formData, config);

  return {
    type: IMG_POST,
    payload: response.data,
  };
}

export async function contentPost(data) {
  const response = await axios.post(`/api/post`, data);

  return {
    type: CONTENT_POST,
    payload: response.data,
  };
}

export async function getPosts(page, username) {
  if (username) {
    const response = await axios.get(
      `/api/post?username=${username}&page=${page}&limit=10`
    );

    return {
      type: GET_POSTS,
      payload: response.data,
    };
  }
  const response = await axios.get(`/api/post?page=${page}&limit=10`);

  return {
    type: GET_POSTS,
    payload: response.data,
  };
}

export async function getAPost(uuid) {
  const response = await axios.get(`/api/post/${uuid}`);

  return {
    type: GET_A_POST,
    payload: response.data,
  };
}

export async function deletePost(uuid) {
  const response = await axios.delete(`/api/post/${uuid}`);

  return {
    type: DELETE_POST,
    payload: response.data,
  };
}
