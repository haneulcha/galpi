import axios from "axios";
import { GET_COMMENT, POST_COMMENT, DELETE_COMMENT } from "./types";

export function getComment(uuid) {
  const request = axios
    .get(`/api/comment/${uuid}`)
    .then((res) => res.data)
    .catch((e) => console.log(e));

  return {
    type: GET_COMMENT,
    payload: request,
  };
}

export function postComment(uuid, body) {
  const request = axios
    .post(`/api/comment/${uuid}`, body)
    .then((res) => res.data)
    .catch((e) => console.log(e));

  return {
    type: POST_COMMENT,
    payload: request,
  };
}

export function deleteComment(id) {
  const request = axios
    .delete(`/api/comment/${id}`)
    .then((res) => res.data)
    .catch((e) => console.log(e));

  return {
    type: DELETE_COMMENT,
    payload: request,
  };
}
