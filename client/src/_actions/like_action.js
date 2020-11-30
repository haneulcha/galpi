import axios from "axios";

import { POST_LIKE, POST_UNLIKE } from "./types";

export async function postLike(uuid) {
  let response = await axios.post(`/api/like/${uuid}/like`);
  return {
    type: POST_LIKE,
    payload: response.data,
  };
}

export async function postUnlike(uuid) {
  let response = await axios.post(`/api/like/${uuid}/unlike`);
  return {
    type: POST_UNLIKE,
    payload: response.data,
  };
}
