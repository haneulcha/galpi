import axios from "axios";
import { GET_COMMENT, POST_COMMENT, DELETE_COMMENT } from "./types";

const baseUrl = `http://localhost:5050`;

export function getComment(uuid) {
  const request = axios
    .get(`${baseUrl}/api/comment/${uuid}`)
    .then((res) => res.data);

  return {
    type: GET_COMMENT,
    payload: request,
  };
}

export function postComment(uuid, body) {
  const request = axios
    .post(`${baseUrl}/api/comment/${uuid}`, body)
    .then((res) => res.data);

  return {
    type: POST_COMMENT,
    payload: request,
  };
}

export function deleteComment(id) {
  const request = axios
    .delete(`${baseUrl}/api/comment/${id}`)
    .then((res) => res.data);

  return {
    type: DELETE_COMMENT,
    payload: request,
  };
}
