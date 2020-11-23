import axios from "axios";
import { POST_LIKE, POST_UNLIKE } from "./types";

export function postLike(uuid) {
  const request = axios
    .get(`/api/like/${uuid}/like`)
    .then((res) => res.data)
    .catch((e) => console.log(e));

  return {
    type: POST_LIKE,
    payload: request,
  };
}

export function postUnlike(uuid) {
  const request = axios
    .get(`/api/like/${uuid}/unlike`)
    .then((res) => res.data)
    .catch((e) => console.log(e));
  return {
    type: POST_UNLIKE,
    payload: request,
  };
}
