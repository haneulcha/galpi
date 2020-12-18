import axios from "axios";
import { GET_COMMENT, POST_COMMENT, DELETE_COMMENT } from "./types";

axios.defaults.withCredentials = true;

export async function getComment(uuid) {
  let response = await axios.get(`/api/comment/${uuid}`);
  return {
    type: GET_COMMENT,
    payload: response.data,
  };
}

export async function postComment(uuid, body) {
  let response = await axios.post(`/api/comment/${uuid}`, body);

  return {
    type: POST_COMMENT,
    payload: response.data,
  };
}

export async function deleteComment(id) {
  let response = await axios.delete(`/api/comment/${id}`);

  return {
    type: DELETE_COMMENT,
    payload: response.data,
  };
}
