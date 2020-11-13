import axios from "axios";
import { CONTENT_POST, IMG_POST } from "./types";

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
